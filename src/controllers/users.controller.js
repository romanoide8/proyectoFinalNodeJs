import { findAllUsersService, findUserByIdService, createUserService, updateUserService, deleteUserByIdService } from "../services/users.service.js"


export const getAllUsersController = async (req, res) => {
    try {
        const users = await findAllUsersService();
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json({ msj: "Error al tratar de obtener todos los usuarios", error: err.message })
    }


};

export const getUserByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await findUserByIdService(id);

        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado" });
        } else {
            res.status(200).json(user);
        }
    }
    catch (err) {
        res.status(500).json({ msj: "Error al obtener el usuario", error: err.message })
    }

};

export const createUserController = async (req, res) => {

    try {
        const newUser = await createUserService(req.body);
        res.status(201).json({ mjs: "Usuario nuevo Creado", usuario: newUser });
    }
    catch (err) {
        res.status(400).json({ msj: "Error al crear un nuevo Usuario", error: err.message })
    }
}




export const updateUserController = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await updateUserService(id, req.body);

        if (!updated) {
            return res.status(404).json({ message: "Usuario para actualizar no encontrado" });
        }
        res.status(200).json({ mjs: "Usuario se actualizo correctamente" });
    }
    catch (err) {
        res.status(500).json({ msj: "Error al actualizar el Usuario", error: err.message })
    }

}







export const loginUserController = (req, res) => {
    res.status(200).json({
        msj: "Login exitoso",
        user: req.user
    });
};


export const deleteUserByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await deleteUserByIdService(id);

        if (!deleted) {
            return res.status(404).json({ message: "Usuario para borrar no encontrado" });
        }
        res.status(200).json({ mjs: "Usuario se elimino correctamente" });
    }
    catch (err) {
        res.status(500).json({ msj: "Error al eliminar el usuario", error: err.message })
    }

}
