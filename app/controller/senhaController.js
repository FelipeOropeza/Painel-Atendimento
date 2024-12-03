import {
  getAllSenhas,
  getProximaSenha,
  getSenhasConcluidas,
} from "../service/senhaService.js";

class SenhaController {
  static async obterSenhas(req, res) {
    const painel = req.session.painel || null;

    if (painel != null) {
      const id = painel.idPainel;
      console.log(id);

      const senhasGeradas = await getAllSenhas();
      const senhaAtual = await getProximaSenha([{ idPainel: id }]);
      const senhasConcluidas = await getSenhasConcluidas([{ idPainel: id }]);
      console.log(senhasConcluidas);

      res.json({
        senhasGeradas,
        senhaAtual,
        senhasConcluidas,
      });
    }
  }
}

export default SenhaController;
