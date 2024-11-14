import prisma from "../prisma/client.js";

export const insertEmpresa = async ([data]) => {
    await prisma.empresa.create({
        data: {
            nmEmpresa: data.nmEmpresa,
            cnpj: data.cnpj,
            emailEmpresa: data.emailEmpresa,
            passwordEmpresa: data.passwordEmpresa
        }
    })
}