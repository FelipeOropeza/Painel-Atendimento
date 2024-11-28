import prisma from "../prisma/client.js";

export const getAllSenhas = async () => {
  return await prisma.senha.findMany({
    where: {
      salaSenha: null,
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

export const getProximaSenha = async () => {
  const proximaFila = await prisma.fila.findFirst({
    where: {
      senha: {
        status: 'pendente', 
      },
    },
    orderBy: {
      posicao: 'asc',
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
        status: 'chamada',
      },
    });

    await prisma.fila.update({
      where: {
        idFila: proximaFila.idFila,
      },
      data: {
        status: 'concluida',
      },
    });

    return proximaFila.senha;
  }

  const ultimaSenhaChamada = await prisma.senha.findFirst({
    where: {
      salaSenha: { not: null },
    },
    orderBy: {
      dataSenha: 'desc',
    },
  });

  return ultimaSenhaChamada;
};

export const getSenhasConcluidas = async () => {
  const senhasConcluidas = await prisma.fila.findMany({
    where: {
      status: 'concluida',
    },
    orderBy: {
      updatedAt: 'desc',
    },
    include: {
      senha: true,
    },
  });

  return senhasConcluidas.map(fila => fila.senha);
};
