import {
  getAllSenhas,
  getProximaSenha,
  getSenhasConcluidas,
  updateSenha,
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

  static async vincularSenha(req, res) {
    const { id } = req.body;
    const guiche = req.session.guiche;
    const idSenha = parseInt(id);
    await updateSenha([{ idSenha, guiche }]);
    res.redirect("/home");
  }
}

export default SenhaController;
