import cors from "cors";
import express from "express";
import routes from "./routes/index.js";

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'app/views');
app.use(express.json());
app.use(cors());
routes(app);

export default app;