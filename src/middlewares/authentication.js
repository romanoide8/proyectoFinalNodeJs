import bcrypt from "bcryptjs";
import { db } from "../firebase/config.js";
import { collection, getDocs } from "firebase/firestore";


export async function basicAuth(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Basic ")) {
            return res.status(401).json({ message: "Se requiere autenticación Basic" });
        }

        const base64Credentials = authHeader.split(" ")[1];
        const credentials = Buffer.from(base64Credentials, "base64").toString("utf8");

        const [email, password] = credentials.split(":");

        // Colección correcta
        const snapshot = await getDocs(collection(db, "users"));

        let user = null;
        snapshot.forEach(doc => {
            const data = doc.data();
            if (data.email === email) {
                user = { firestoreId: doc.id, ...data };
            }
        });

        if (!user) {
            return res.status(403).json({ message: "Credenciales inválidas" });
        }

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
            return res.status(403).json({ message: "Contraseña incorrecta" });
        }

        req.user = user;
        next();

    } catch (error) {
        console.error("Error en autenticación:", error);
        return res.status(500).json({ message: "Error interno en autenticación" });
    }
}

export function checkAdmin(req, res, next) {
    if (!req.user || req.user.rol !== "admin") {
        return res.status(403).json({ message: "Solo administradores pueden realizar esta acción" });
    }
    next();
}