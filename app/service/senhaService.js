import prisma from "../prisma/client.js";

export const getAllSenhas = async ([data]) => {
  const { idPainel } = data;

  return await prisma.senha.findMany({
    where: {
      fkPainel: idPainel,
      salaSenha: null,
    },
    include: {
      painel: true,
    },
  });
};

export const updateSenha = async ([data]) => {
  const updatedSenha = await prisma.senha.update({
    where: {
      idSenha: data.idSenha,
    },
    data: {
      salaSenha: data.guiche,
    },
  });

  await prisma.fila.create({
    data: {
      fkSenha: updatedSenha.idSenha,
      posicao: await getNextFilaPosition(),
    },
  });
};

const getNextFilaPosition = async () => {
  const lastFila = await prisma.fila.findFirst({
    orderBy: {
      posicao: "desc",
    },
  });
  return lastFila ? lastFila.posicao + 1 : 1;
};

export const getProximaSenha = async ([data]) => {
  const { idPainel } = data;

  const proximaFila = await prisma.fila.findFirst({
    where: {
      status: "pendente",
      senha: {
        fkPainel: idPainel,
      },
    },
    orderBy: {
      posicao: "asc",
    },
    include: {
      senha: true,
    },
  });

  if (proximaFila) {
    await prisma.senha.update({
      where: {
        idSenha: proximaFila.senha.idSenha,
      },
      data: {
        status: "chamada",
      },
    });

    await prisma.fila.update({
      where: {
        idFila: proximaFila.idFila,
      },
      data: {
        status: "concluida",
      },
    });

    return proximaFila.senha;
  }

  const ultimaSenhaChamada = await prisma.senha.findFirst({
    where: {
      fkPainel: idPainel,
      salaSenha: { not: null },
    },
    orderBy: {
      dataSenha: "desc",
    },
  });

  return ultimaSenhaChamada;
};

export const getSenhasConcluidas = async ([data]) => {
  const { idPainel } = data;

  const senhasConcluidas = await prisma.fila.findMany({
    where: {
      status: "concluida",
      senha: {
        fkPainel: idPainel,
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      senha: true,
    },
  });

  return senhasConcluidas.map((fila) => fila.senha);
};
