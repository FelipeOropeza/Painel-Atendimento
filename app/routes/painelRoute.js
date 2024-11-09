import express from "express";
import painelController from "../controller/painelController.js";

const routes = express.Router();

routes.get("/", painelController.insertEmpresa);

export default routes;