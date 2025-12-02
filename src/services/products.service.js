import { db } from "../firebase/config.js"
import { ProductModel } from "../models/products.models.js"
import { collection, getDoc, getDocs, doc, deleteDoc, updateDoc, addDoc } from "firebase/firestore";

const collectionName = "products"


export const gettAllProductsService = async () => {

  const productsCol = collection(db, collectionName);
  const snapshot = await getDocs(productsCol);

  if (snapshot.empty) return [];

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};



export const getProductByIdService = async (id) => {

  const productsCol = collection(db, collectionName);
  const snapshot = await getDocs(productsCol);

  if (snapshot.empty) return null;

  let productFound = null;

  snapshot.forEach(doc => {
    const data = doc.data();
    if (String(data.id) === String(id)) {
      productFound = { firestoreId: doc.id, ...data };
    }
  });

  return productFound;
};






export const createProductService = async (data) => {

  if (!data.nombre || !data.precio) {
    throw new Error("Nombre y precio son campos obligatorios");
  }

  if (!data.id) {
    throw new Error("El campo 'id' es obligatorio para crear un producto");
  }

  const productsCol = collection(db, collectionName);
  const snapshot = await getDocs(productsCol);

  const idExists = false;

  snapshot.forEach(doc => {
    const prod = doc.data();
    if (String(prod.id) === String(data.id)) {
      idExists = true;
    }
  });

  if (idExists) {
    throw new Error(`Ya existe un producto con el id interno '${data.id}'`);
  }

  const productToSave = {
    id: Number(data.id),
    nombre: data.nombre,
    precio: Number(data.precio),
    stock: Number(data.stock) || 0,
    descripcion: data.descripcion || "",
    categoria: data.categoria || ""
  };


  const docRef = await addDoc(productsCol, productToSave);

  return {
    firestoreId: docRef.id,
    ...productToSave
  };
};


export const deleteProductService = async (id) => {

  const numericId = Number(id);

  const snapshot = await getDocs(collection(db, collectionName));

  let documentToDelete = null;


  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    if (data.id === numericId) {
      documentToDelete = docSnap;
    }
  });


  if (!documentToDelete) return null;

  await deleteDoc(doc(db, collectionName, documentToDelete.id));

  return true;

}



export const updateProductService = async (id, dataToUpdate) => {
  const numericId = Number(id);

  const snapshot = await getDocs(collection(db, collectionName));

  let documentToUpdate = null;

  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    if (Number(data.id) === numericId) {
      documentToUpdate = docSnap;
    }
  });

  if (!documentToUpdate) return null;

  await updateDoc(
    doc(db, collectionName, documentToUpdate.id),
    dataToUpdate
  );


  return {
    firestoreId: documentToUpdate.id,
    ...documentToUpdate.data(),
    ...dataToUpdate
  };
};