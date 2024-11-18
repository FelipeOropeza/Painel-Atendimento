import bcrypt from "bcrypt";

export const criptografarSenha = async (senha) => {
  const saltsRounds = 10;
  const senhaCripto = await bcrypt.hash(senha, saltsRounds);

  return senhaCripto;
};

export const verificarSenha = async (senha, senhadb) => {
  const result = await bcrypt.compare(senha, senhadb);

  if (result) {
    return true;
  } else {
    return false;
  }
};
