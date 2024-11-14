import { insertEmpresa } from "../service/empresaService.js";

class EmpresaController {
  static loginEmpresa(req, res) {
    res.render("index");
  }

  static cadastroEmpresa(req, res) {
    res.render("formEmpresa", { errorMessage: "", successMessage: "" });
  }

  static async postEmpresa(req, res) {
    try {
        const { nmEmpresa, cnpj, emailEmpresa, passwordEmpresa } = req.body;

        if (!nmEmpresa || !cnpj || !emailEmpresa || !passwordEmpresa) {
            return res.render('formEmpresa', { errorMessage: "Todos os campos são obrigatórios.", successMessage: "" });
        }
        // const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
        // if (!cnpjRegex.test(cnpj)) {
        //     return res.render('formEmpresa', { errorMessage: "CNPJ em formato inválido.", successMessage: "" });
        // }

        await insertEmpresa([{nmEmpresa, cnpj, emailEmpresa, passwordEmpresa}]);
        res.render('formEmpresa', { errorMessage: "", successMessage: "Empresa cadastrada com sucesso!" });
    } catch (error) {
        console.error("Erro ao cadastrar empresa:", error);
        res.render('formEmpresa', { errorMessage: "Erro interno do servidor.", successMessage: "" });
    }
}


}

export default EmpresaController;
