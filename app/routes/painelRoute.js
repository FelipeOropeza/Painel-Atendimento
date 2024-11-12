import express from "express";
import painelController from "../controller/painelController.js";

const routes = express.Router();

routes.get("/", painelController.loginEmpresa);
routes.get("/cadastro", painelController.cadastroEmpresa)
routes.post("/cadastro/create", painelController.insertEmpresa);

export default routes;