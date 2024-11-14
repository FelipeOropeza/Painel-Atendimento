import express from "express";
import empresaController from "../controller/empresaController.js";

const routes = express.Router();

routes.get("/", empresaController.loginEmpresa);
routes.get("/cadastro", empresaController.cadastroEmpresa)
routes.post("/cadastro/create", empresaController.postEmpresa);

export default routes;