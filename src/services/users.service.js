import bcrypt from 'bcryptjs';
import { collection, getDoc, getDocs, doc, deleteDoc, updateDoc, addDoc } from "firebase/firestore";
import { db } from '../firebase/config.js';
import { UserModel } from '../models/users.models.js';

const ruta = "users";




export const findAllUsersService = async () => {

    const totalUsers = await getDocs(collection(db, ruta))

    return totalUsers.docs.map(d => {
        const { password, ...u } = d.data();
        return new UserModel({ id: doc.id, ...u })
    })
}


export const findUserByIdService = async (id) => {

    const snapshot = await getDocs(collection(db, ruta))

    const user = snapshot.find(u => u.id === parseInt(id))
    if (!user) return null;

    const { password, ...userData } = user;
    return userData

}



export const createUserService = async (data) => {

    const { nombre, email, password, rol, ubicacion, experiencia } = data;

    const UserCol = getDocs(collection(db, ruta))
    //const productsCol = collection(db, collectionName);

    if (!nombre || !email || !password) {
        throw new Error("Faltan campos obligatorios (nombre - email - pass)")
    }

    if (users.some((u) => { u.email === email })) {
        throw new Error("El correo ya existe")
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = await addDoc(UserCol, {
        id: users.length ? (users[users.length - 1].id + 1) : 1,
        nombre,
        email,
        password: hash,
        rol: rol || "Rol aun no asignado",
        ubicacion: ubicacion || "Ubicacion desconocida",
        experiencia: experiencia || "Sin experiencia"
    })

    const { password: _, ...userWithoutPassword } = newUser;

    return userWithoutPassword



}



export const updateUserService = async (id, data) => {


    const userRef = doc(db, ruta, id);

    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) return null;

    const presentData = userSnap.data();

    const newPassword = presentData.password;
    if (data.password) {
        newPassword = await bcrypt.hash(data.password, 10);
    }

    const updatedUser = {
        id: currentData.id,
        nombre: data.nombre || currentData.nombre,
        email: data.email || currentData.email,
        password: newPassword,
        rol: data.rol || currentData.rol,
        ubicacion: data.ubicacion || currentData.ubicacion,
        experiencia: data.experiencia || currentData.experiencia
    };

    await updateDoc(userRef, updatedUser)

    const { password, ...userWithoutPassword } = updatedUser;

    return userWithoutPassword



}


export const deleteUserService = async (id) => {
    const docRef = doc(db, ruta, id);
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) return null;

    await deleteDoc(docRef);
    return true;
}




export const verifyCredentialsService = async (email, password) => {
    const snapshot = await getDocs(collection(db, ruta));

    let user = null;

    snapshot.forEach(doc => {
        const data = doc.data();
        if (data.email === email) {
            user = { id: doc.id, ...data };
        }
    });

    if (!user) {
        throw new Error("Mail no registrado");
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        throw new Error("Contraseña incorrecta!");
    }

    const { password: _, ...safeUser } = user;

    return safeUser;
};