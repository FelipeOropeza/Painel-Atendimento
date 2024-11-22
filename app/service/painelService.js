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
