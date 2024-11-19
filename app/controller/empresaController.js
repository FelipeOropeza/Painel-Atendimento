import { getbyEmpresa, insertEmpresa } from "../service/empresaService.js";
import { verificarSenha } from "../utils/hashUtil.js";

class EmpresaController {
  static loginEmpresa(req, res) {
    res.render("index", { errorMessage: "", successMessage: "" });
  }

  static async postLoginEmpresa(req, res) {
    try {
      const { email, senha } = req.body;
      if (!email || !senha) {
        return res.render("index", {
          errorMessage: "Todos os campos são obrigatórios.",
          successMessage: "",
          email: "",
          senha: "",
        });
      }
      const empresa = await getbyEmpresa([{ email }]);
      if (!empresa) {
        return res.render("index", {
          errorMessage: "Empresa não encontrada.",
          successMessage: "",
          email: "",
          senha: "",
        });
      }

      const bool = await verificarSenha(senha, empresa.passwordEmpresa);
      if (!bool) {
        return res.render("index", {
          errorMessage: "A senha está incorreta.",
          successMessage: "",
          email: "",
          senha: "",
        });
      }

      const { passwordEmpresa, cnpj, ...empresaSemDadosSensíveis } = empresa;

      req.session.dados = { empresa: empresaSemDadosSensíveis };

      return res.render("index", {
        errorMessage: "",
        successMessage: "Login feito com sucesso!",
        email: "",
        senha: "",
      });
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      return res.render("index", {
        errorMessage: "Erro interno do servidor.",
        successMessage: "",
        email: "",
        senha: "",
      });
    }
  }

  static cadastroEmpresa(req, res) {
    res.render("formEmpresa", { errorMessage: "", successMessage: "" });
  }

  static async postEmpresa(req, res) {
    try {
      const { nmEmpresa, cnpj, emailEmpresa, passwordEmpresa } = req.body;

      if (!nmEmpresa || !cnpj || !emailEmpresa || !passwordEmpresa) {
        return res.render("formEmpresa", {
          errorMessage: "Todos os campos são obrigatórios.",
          successMessage: "",
        });
      }

      await insertEmpresa([{ nmEmpresa, cnpj, emailEmpresa, passwordEmpresa }]);
      res.render("formEmpresa", {
        errorMessage: "",
        successMessage: "Empresa cadastrada com sucesso!",
      });
    } catch (error) {
      console.error("Erro ao cadastrar empresa:", error);
      res.render("formEmpresa", {
        errorMessage: "Erro interno do servidor.",
        successMessage: "",
      });
    }
  }
}

export default EmpresaController;
