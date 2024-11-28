import express from "express";
import empresa from "./empresaRoute.js";
import home from "./homeRoute.js";
import painel from "./painelRoute.js";
import senha from "./senheRoute.js";
import apiTemperatura from "../api/temperaturaApi.js"

const routes = (app) => {
  app.use(express.json(), empresa, home, painel, senha, apiTemperatura);
};

export default routes;