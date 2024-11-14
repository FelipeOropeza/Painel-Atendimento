import express from "express";
import empresa from "./empresaRoute.js";

const routes = (app) => {
  app.use(express.json(), empresa);
};

export default routes;