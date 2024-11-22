import express from "express";
import painelController from "../controller/painelController.js";

const routes = express.Router();

routes.get("/criar-painel", painelController.criarPainel);
routes.post("/painel/cadastrar", painelController.cadastroPainel);

export default routes;