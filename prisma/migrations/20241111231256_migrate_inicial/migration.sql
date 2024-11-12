/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TipogeraPainel" AS ENUM ('numero', 'letra');

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Empresa" (
    "idEmpresa" SERIAL NOT NULL,
    "nmEmpresa" TEXT NOT NULL,
    "cnpj" BIGINT NOT NULL,
    "emailEmpresa" TEXT NOT NULL,
    "passwordEmpresa" TEXT NOT NULL,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("idEmpresa")
);

-- CreateTable
CREATE TABLE "Painel" (
    "idPainel" SERIAL NOT NULL,
    "nmPainel" TEXT NOT NULL,
    "emailPainel" TEXT NOT NULL,
    "passwordPainel" TEXT NOT NULL,
    "tipoSenha" "TipogeraPainel" NOT NULL,
    "fkEmpresa" INTEGER,

    CONSTRAINT "Painel_pkey" PRIMARY KEY ("idPainel")
);

-- CreateTable
CREATE TABLE "Senha" (
    "idSenha" SERIAL NOT NULL,
    "nmSenha" TEXT NOT NULL,
    "dataSenha" TIMESTAMP(3),
    "fkPainel" INTEGER,

    CONSTRAINT "Senha_pkey" PRIMARY KEY ("idSenha")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "idUser" SERIAL NOT NULL,
    "nmUser" TEXT NOT NULL,
    "cpfUser" TEXT NOT NULL,
    "emailUser" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("idUser")
);

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_cnpj_key" ON "Empresa"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_emailEmpresa_key" ON "Empresa"("emailEmpresa");

-- AddForeignKey
ALTER TABLE "Painel" ADD CONSTRAINT "Painel_fkEmpresa_fkey" FOREIGN KEY ("fkEmpresa") REFERENCES "Empresa"("idEmpresa") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Senha" ADD CONSTRAINT "Senha_fkPainel_fkey" FOREIGN KEY ("fkPainel") REFERENCES "Painel"("idPainel") ON DELETE CASCADE ON UPDATE CASCADE;
