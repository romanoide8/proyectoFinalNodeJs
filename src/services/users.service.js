import bcrypt from 'bcryptjs';
import { collection, getDoc, getDocs, doc, deleteDoc, updateDoc, addDoc } from "firebase/firestore";
import { db } from '../firebase/config.js';
import { UserModel } from '../models/users.models.js';

const ruta = "users";



export const findAllUsersService = async () => {
    const snapshot = await getDocs(collection(db, ruta));

    const users = snapshot.docs.map(d => {
        const data = d.data();

        const { password, ...rest } = data;


        return {
            firestoreId: d.id,
            id: rest.id,
            nombre: rest.nombre,
            email: rest.email,
            rol: rest.rol || "sin rol",
            ubicacion: rest.ubicacion || "desconocido",
            experiencia: rest.experiencia || "Sin experiencia"
        };
    });

    return users;
};



export const findUserByIdService = async (id) => {
    const numericId = Number(id);
    const snapshot = await getDocs(collection(db, ruta));

    let foundUser = null;

    snapshot.forEach(docSnap => {
        const data = docSnap.data();

        if (Number(data.id) === numericId) {
            foundUser = { firestoreId: docSnap.id, ...data };
        }
    });

    if (!foundUser) return null;


    const { password, ...userData } = foundUser;

    return userData;
};





export const createUserService = async (data) => {
    const { nombre, email, password, rol, ubicacion, experiencia } = data;

    if (!nombre || !email || !password) {
        throw new Error("Faltan campos obligatorios (nombre, email, password)");
    }


    const snapshot = await getDocs(collection(db, ruta));

    let maxId = 0;
    let emailExists = false;

    snapshot.forEach((docSnap) => {
        const user = docSnap.data();


        if (user.email === email) emailExists = true;

        if (emailExists) {
            throw new Error("El correo ya existe");
        }


        if (typeof user.id === "number" && user.id > maxId) {
            maxId = user.id;
        }
    });


    const newUserId = maxId + 1;


    const hashedPassword = await bcrypt.hash(password, 10);

    const usersColRef = collection(db, ruta);
    const docRef = await addDoc(usersColRef, {
        id: newUserId,
        nombre,
        email,
        password: hashedPassword,
        rol: rol || "Rol aun no asignado",
        ubicacion: ubicacion || "Ubicacion desconocida",
        experiencia: experiencia || "Sin experiencia"
    });


    return {
        firestoreId: docRef.id,
        id: newUserId,
        nombre,
        email,
        rol: rol || "Rol aun no asignado",
        ubicacion: ubicacion || "Ubicacion desconocida",
        experiencia: experiencia || "Sin experiencia"
    };
};




export const updateUserService = async (id, data) => {
    const numericId = Number(id);


    const snapshot = await getDocs(collection(db, ruta));

    let documentToUpdate = null;


    snapshot.forEach(docSnap => {
        const userData = docSnap.data();
        if (Number(userData.id) === numericId) {
            documentToUpdate = docSnap;
        }
    });

    if (!documentToUpdate) return null;

    const presentData = documentToUpdate.data() || {};


    let newPassword = presentData.password || null;

    if (data.password && typeof data.password === "string" && data.password.trim() !== "") {
        newPassword = await bcrypt.hash(data.password, 10);
    }


    const updatedUser = {
        id: presentData.id,
        nombre: data.nombre ?? presentData.nombre,
        email: data.email ?? presentData.email,
        password: newPassword,
        rol: data.rol ?? presentData.rol,
        ubicacion: data.ubicacion ?? presentData.ubicacion,
        experiencia: data.experiencia ?? presentData.experiencia
    };


    const userRef = doc(db, ruta, documentToUpdate.id);
    await updateDoc(userRef, updatedUser);


    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
};




export const deleteUserByIdService = async (id) => {
    const numericId = Number(id);


    const snapshot = await getDocs(collection(db, ruta));

    let documentToDelete = null;


    snapshot.forEach(docSnap => {
        const userData = docSnap.data();
        if (Number(userData.id) === numericId) {
            documentToDelete = docSnap;
        }
    });


    if (!documentToDelete) return null;


    const docRef = doc(db, ruta, documentToDelete.id);
    await deleteDoc(docRef);

    return true;
};


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