import { getAllSenhas, getProximaSenha, getSenhasConcluidas } from "../service/senhaService.js";

class SenhaController {
  static async obterSenhas(req, res) {
    const senhasGeradas = await getAllSenhas();
    const senhaAtual = await getProximaSenha();
    const senhasConcluidas = await getSenhasConcluidas();

    res.json({
      senhasGeradas,
      senhaAtual,
      senhasConcluidas,
    });
  }
}

export default SenhaController;
