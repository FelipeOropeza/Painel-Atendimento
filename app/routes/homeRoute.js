import express from "express";
import homeController from "../controller/homeController.js";

const routes = express.Router();

routes.get("/home", homeController.home);
routes.post("/set-guiche", homeController.setGuiche);
routes.get("/logout", homeController.logout);
routes.post("/vincular-senha", homeController.vincularSenha);

export default routes;