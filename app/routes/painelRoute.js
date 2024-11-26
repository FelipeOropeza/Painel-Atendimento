import express from "express";
import painelController from "../controller/painelController.js";

const routes = express.Router();

routes.get("/criar-painel", painelController.criarPainel);
routes.post("/painel/cadastrar", painelController.cadastroPainel);
routes.get("/painel", painelController.painel)
routes.post("/login-painel", painelController.loginPainel);

export default routes;