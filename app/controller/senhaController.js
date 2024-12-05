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

      const senhasGeradas = await getAllSenhas([{ idPainel: id }]);
      const senhaAtual = await getProximaSenha([{ idPainel: id }]);
      const senhasConcluidas = await getSenhasConcluidas([{ idPainel: id }]);

      res.json({
        senhasGeradas,
        senhaAtual,
        senhasConcluidas,
      });
    }
  }

  static async geracaoSenhas(req, res) {
    const painel = req.session.painel || null;

    if (painel !== null) {
      const id = painel.idPainel;
      const senhasGeradas = await getAllSenhas([{ idPainel: id }]);

      res.json(senhasGeradas);
    }
  }
}

export default SenhaController;
