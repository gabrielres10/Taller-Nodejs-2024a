import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { db } from "./config/db";
import routes from "./routes/index";

//Inicializamos express
const app: Express = express();
dotenv.config();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Puerto
const port = process.env.PORT || 3000;

//Rutas
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.get("/about", (req: Request, res: Response) => {
  res.send("About Us");
});

app.post("/about", (req: Request, res: Response) => {
  res.send("name: " + req.body.name);
});

//Importamos routes
routes(app);

//Conectamos a la base de datos y levantamos el servidor
db.then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
