import express from "express";
import empresa from "./empresaRoute.js";
import home from "./homeRoute.js"
import painel from "./painelRoute.js"

const routes = (app) => {
  app.use(express.json(), empresa, home, painel);
};

export default routes;