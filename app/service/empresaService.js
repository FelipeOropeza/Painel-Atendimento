import prisma from "../prisma/client.js";
import { criptografarSenha } from "../utils/hashUtil.js";

export const insertEmpresa = async ([data]) => {
  const senhadb = await criptografarSenha(data.passwordEmpresa);
  await prisma.empresa.create({
    data: {
      nmEmpresa: data.nmEmpresa,
      cnpj: data.cnpj,
      emailEmpresa: data.emailEmpresa,
      passwordEmpresa: senhadb,
    },
  });
};

export const getbyEmpresa = async ([data]) => {
  const getEmpresa = await prisma.empresa.findFirst({
    where: {
      emailEmpresa: data.email,
    },
  });

  return getEmpresa;
};
