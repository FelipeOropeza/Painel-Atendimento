import prisma from "../prisma/client.js";

export const getAllSenhas = async () => {
  return await prisma.senha.findMany({
    where: {
      salaSenha: null,
    },
  });
};

export const updateSenha = async ([data]) => {
  await prisma.senha.update({
    where: {
      idSenha: data.idSenha,
    },
    data: {
      salaSenha: data.guiche,
    },
  });
};
