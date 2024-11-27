import { getAllSenhas, updateSenha } from "../service/senhaService.js";

class HomeController {
  static async home(req, res) {
    if (!req.session.dados) {
      return res.redirect("/");
    }
    const senhas = await getAllSenhas();
    const senhasConvertidas = senhas.map((senha) => ({
      ...senha,
      nmSenha: parseInt(senha.nmSenha, 10),
    }));
    const guiche = req.session.guiche || null;

    res.render("home", { guiche, senhas: senhasConvertidas });
  }

  static setGuiche(req, res) {
    const { guiche } = req.body;
    req.session.guiche = guiche;
    res.redirect("/home");
  }

  static logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.error("Erro ao destruir a sessão:", err);
        return res.status(500).send("Erro ao realizar logout.");
      }
      res.clearCookie("connect.sid");
      res.redirect("/");
    });
  }

  static async vincularSenha(req, res) {
    const { id } = req.body;
    const guiche = req.session.guiche;
    const idSenha = parseInt(id);
    await updateSenha([{ idSenha, guiche }]);
    res.redirect("/home");
  }
}

export default HomeController;
