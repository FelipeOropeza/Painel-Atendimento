import express from "express";
import empresa from "./empresaRoute.js";
import home from "./homeRoute.js"

const routes = (app) => {
  app.use(express.json(), empresa, home);
};

export default routes;