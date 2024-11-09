import express from "express";
import painel from "./painelRoute.js";

const routes = (app) => {
  app.use(express.json(), painel);
};

export default routes;