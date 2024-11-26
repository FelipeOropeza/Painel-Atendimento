import prisma from "../prisma/client.js";
import { criptografarSenha } from "../utils/hashUtil.js";

export const insertPainel = async ([data]) => {
  const senhadb = await criptografarSenha(data.passwordPainel);
  await prisma.painel.create({
    data: {
      nmPainel: data.nmPainel,
      emailPainel: data.emailPainel,
      passwordPainel: senhadb,
      tipoSenha: data.tipoSenha,
      fkEmpresa: data.idempresa,
    },
  });
};

export const getbyPainel = async ([data]) => {
  const getPainel = await prisma.painel.findFirst({
    where: {
      emailPainel: data.email,
    },
  });

  return getPainel;
}
