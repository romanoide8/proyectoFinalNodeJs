import express from "express";
import "dotenv/config"
import cors from "cors";
import productsRouter from "./routes/products.routes.js";
import UsersRouter from "./routes/users.routes.js";
// import { authentication } from "./middlewares/authentication.js";
// import authRouter from "./routes/auth.routes.js";

const app = express();
app.use(express.json())


// app.use(bodyParser.json());
//permitir origenes
app.use(cors());


// Routers
//app.use("/auth", authRouter);
app.use("/products", productsRouter);
// app.use("/categories", authentication, categoriesRouter);
app.use("/users", UsersRouter);

//Middleware de errores

app.use((req, res, next) => {
  res.status(404).send("Recurso no encontrado");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

//quizas esto lo tenga que poner dentro de los routes
//router.get("/products", authentication, getAllProducts);
//router.get("/products/:id", authentication, getProductById);
//router.post("/products", authentication, createProduct);
