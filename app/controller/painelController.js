import { getbyPainel, insertPainel } from "../service/painelService.js";
import { getAllSenhas, getProximaSenha, getSenhasConcluidas } from "../service/senhaService.js";
import { verificarSenha } from "../utils/hashUtil.js";

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

  static async painel(req, res) {
    const painel = req.session.painel || null;
    const senhasGeradas = await getAllSenhas();
    const senhaAtual = await getProximaSenha();
    const senhasConcluidas = await getSenhasConcluidas(); // Obtém as senhas concluídas

    res.render("painel", {
      painel,
      senhasGeradas,
      senhaAtual,
      senhasConcluidas ,
      redirect: "",
      errorMessage: "",
      successMessage: "",
    });
  }

  static async loginPainel(req, res) {
    try {
      const { email, password } = req.body;
      const senhasGeradas = await getAllSenhas();
      const senhaAtual = await getProximaSenha();
      const senhasConcluidas = await getSenhasConcluidas(); // Obtém as senhas concluídas

      if (!email || !password) {
        return res.render("painel", {
          painel: null,
          senhasGeradas: null,
          senhaAtual: null,
          senhasConcluidas: null,
          errorMessage: "Todos os campos são obrigatórios.",
          successMessage: "",
          email,
          password,
        });
      }

      const painel = await getbyPainel([{ email }]);
      if (!painel) {
        return res.render("painel", {
          painel: null,
          senhasGeradas: null,
          senhaAtual: null,
          senhasConcluidas: null,
          errorMessage: "O Painel não foi encontrado.",
          successMessage: "",
          email,
          password,
        });
      }

      const bool = await verificarSenha(password, painel.passwordPainel);
      if (!bool) {
        return res.render("painel", {
          painel: null,
          senhasGeradas: null,
          senhaAtual: null,
          senhasConcluidas: null,
          errorMessage: "A senha está incorreta.",
          successMessage: "",
          email,
          password,
        });
      }

      const { passwordPainel, ...painelSemDadosSensíveis } = painel;

      req.session.painel = painelSemDadosSensíveis;

      return res.render("painel", {
        painel,
        senhasGeradas,
        senhaAtual,
        senhasConcluidas,
        errorMessage: "",
        successMessage: "Login feito com sucesso!",
        email: "",
        password: "",
        redirect: "/painel",
      });
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      return res.render("painel", {
        painel: null,
        senhasGeradas: null,
        senhaAtual: null,
        senhasConcluidas: null,
        errorMessage: "Erro interno do servidor.",
        successMessage: "",
        email: "",
        password: "",
      });
    }
  }
}

export default PainelController;
