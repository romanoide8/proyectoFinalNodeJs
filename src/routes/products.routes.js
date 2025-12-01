import express from "express";
const router = express.Router();

import {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProductById,
} from "../controllers/products.controller";

router.get("/", getAllProducts);
router.get("/:id", getProductById);

router.post("/create", createProduct);

router.put("/:id", deleteProductById);

router.delete("/:id", deleteProductById);


export default router;
