import express from "express";
import homeController from "../controller/homeController.js";

const routes = express.Router();

routes.get("/home", homeController.home);

export default routes;