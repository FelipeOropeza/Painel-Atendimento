import { insertPainel } from "../service/painelService.js";

class PainelController {
  static criarPainel(req, res) {
    if (!req.session.dados) {
      return res.redirect("/");
    }

    const guiche = req.session.guiche || null;

    res.render("formPainel", {
      guiche,
      nmPainel: "",
      emailPainel: "",
      passwordPainel: "",
      tipoSenha: "",
      errorMessage: "",
      successMessage: "",
    });
  }

  static async cadastroPainel(req, res) {
    try {
      const { nmPainel, emailPainel, passwordPainel, tipoSenha } = req.body;
      const guiche = req.session.guiche || null;

      if (!nmPainel || !emailPainel || !passwordPainel || !tipoSenha) {
        return res.render("formPainel", {
          guiche,
          errorMessage: "Todos os campos são obrigatórios.",
          successMessage: "",
        });
      }

      const empresa = req.session.dados.empresa;
      const idempresa = empresa.idEmpresa;

      await insertPainel([
        { nmPainel, emailPainel, passwordPainel, tipoSenha, idempresa },
      ]);

      res.render("formPainel", {
        guiche,
        errorMessage: "",
        successMessage: "Empresa cadastrada com sucesso!",
      });
    } catch (error) {
      const guiche = req.session.guiche || null;

      console.error("Erro ao cadastrar painel:", error);
      res.render("formPainel", {
        guiche,
        errorMessage: "Erro interno do servidor.",
        successMessage: "",
      });
    }
  }
}

export default PainelController;
