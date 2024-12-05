import express from "express";
import senhaController from "../controller/senhaController.js";

const routes = express.Router();

routes.get("/obter-senhas", senhaController.obterSenhas);
routes.get("/senhas-geradas", senhaController.geracaoSenhas);

export default routes;