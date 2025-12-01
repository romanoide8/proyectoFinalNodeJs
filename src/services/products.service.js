import { db } from "../firebase/config.js"
import { ProductModel } from "../models/product.model.js"
import { collection, getDoc, getDocs, doc, deleteDoc, updateDoc, addDoc } from "firebase/firestore";

const collectionName = "productos"

export const gettAllProducts = async () => {

  const productsCol = collection(db, collectionName);
  const snapshot = await getDocs(productsCol)

  if (snapshot.empty) return []

  return snapshot.docs.map(doc => new ProductModel({ id: doc.id, ...doc.data() }))

}

export const getProductById = async (id) => {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return null;

  return new ProductModel({ id: docSnap.id, ...docSnap.data() })
}

export const createProduct = async (data) => {
  if (!data.nombre || !data.precio) {
    throw new Error("Nombre y precio son campos obligatorios")
  }

  const productsCol = collection(db, collectionName);
  const docRef = await addDoc(productsCol, {
    nombre: data.nombre,
    precio: Number(data.precio),
    stock: Number(data.stock || 0),
    descripcion: data.descripcion || "",
    categoria: data.categoria || ""
  })
  return new ProductModel({ id: docRef.id, ...data });
}

export const deleteProduct = async (id) => {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists()) return null;

  await deleteDoc(docRef);
  return true;
}

export const updateProduct = async (id, data) => {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists()) return null;

  await updateDoc(docRef, data);

  return { id, ...docSnap.data(), ...data }
}