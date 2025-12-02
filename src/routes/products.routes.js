import express from "express";
const router = express.Router();

import {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProductById,
  updateProductById,
} from "../controllers/products.controller.js";

router.get("/", getAllProducts);
router.get("/:id", getProductById);

router.post("/create", createProduct);

router.put("/:id", updateProductById);

router.delete("/:id", deleteProductById);


export default router;
