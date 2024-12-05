import express from "express";
import senhaController from "../controller/senhaController.js";

const routes = express.Router();

routes.get("/obter-senhas", senhaController.obterSenhas);
routes.get("/senhas-geradas", senhaController.geracaoSenhas);
routes.post("/vincular-senha", senhaController.vincularSenha);

export default routes;