import * as productsService from "../services/products.service.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await productsService.getAllProducts();
    req.status(200).json(products);
  }
  catch (err) {
    res.status(500).json({ msj: "Error al tratar de obtener todos los productos", error: err.message })
  }


};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsService.getProductById(id);

    if (!product) {
      res.status(404).json({ message: "Producto no encontrado" });
    } else {
      res.status(200).json(product);
    }
  }
  catch (err) {
    res.status(500).json({ msj: "Error al obtener el producto", error: err.message })
  }

};

export const createProduct = async (req, res) => {

  try {
    const newProduct = await productsService.createProduct(req.body);
    res.status(201).json({ mjs: "Producto Creado", producto: newProduct });
  }
  catch (err) {
    res.status(400).json({ msj: "Error al crear un nuevo producto", error: err.message })
  }
}

export const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await productsService.deleteProduct(id);

    if (!deleted) {
      return res.status(404).json({ message: "Producto para borrar no encontrado" });
    }
    res.status(200).json({ mjs: "Producto se elimino correctamente" });
  }
  catch (err) {
    res.status(500).json({ msj: "Error al eliminar el producto", error: err.message })
  }

}



export const updateProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await productsService.updateProduct(id);

    if (!updated) {
      return res.status(404).json({ message: "Producto para actualizar no encontrado" });
    }
    res.status(200).json({ mjs: "Producto se actualizo correctamente" });
  }
  catch (err) {
    res.status(500).json({ msj: "Error al actualizar el producto", error: err.message })
  }

}