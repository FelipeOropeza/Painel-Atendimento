import cors from "cors";
import express from "express";
import routes from "./routes/index.js";
import session from "express-session";
import path from "path";

const app = express();
app.set("view engine", "ejs");
app.set("views", "app/views");
app.use(express.static("./public"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "seu-segredo-unico",
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.use((req, res, next) => {
  res.locals.dados = req.session.dados || null; 
  next();
});

app.use(cors());
routes(app);

export default app;
