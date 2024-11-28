-- CreateTable
CREATE TABLE "Fila" (
    "idFila" SERIAL NOT NULL,
    "posicao" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pendente',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fkSenha" INTEGER NOT NULL,

    CONSTRAINT "Fila_pkey" PRIMARY KEY ("idFila")
);

-- CreateIndex
CREATE UNIQUE INDEX "Fila_posicao_key" ON "Fila"("posicao");

-- AddForeignKey
ALTER TABLE "Fila" ADD CONSTRAINT "Fila_fkSenha_fkey" FOREIGN KEY ("fkSenha") REFERENCES "Senha"("idSenha") ON DELETE CASCADE ON UPDATE CASCADE;
