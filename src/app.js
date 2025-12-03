import express from "express";
import "dotenv/config"
import cors from "cors";
import productsRouter from "./routes/products.routes.js";
import UsersRouter from "./routes/users.routes.js";



const app = express();
app.use(express.json())

app.use(cors());

app.use("/products", productsRouter);

app.use("/users", UsersRouter);


app.use((req, res, next) => {
  res.status(404).send("Recurso no encontrado");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

