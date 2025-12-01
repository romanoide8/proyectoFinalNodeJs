import { findAllUsersService, findUserByIdService, createUserService, updateUserService, VerifyCredentialsService } from "../services/user.service.js"


export const getAllUsersController = async (req, res) => {
    try {
        const users = await findAllUsersService();
        req.status(200).json(users);
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




export const loginUserController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await VerifyCredentialsService(email, password);
        res.status(200).json({ msj: "login fue existoso", user })

    }
    catch (err) {
        res.status(401).json({ msj: err.message })
    }

}






// export const deleteUserByIdController = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const deleted = await productsService.deleteProduct(id);

//         if (!deleted) {
//             return res.status(404).json({ message: "Producto para borrar no encontrado" });
//         }
//         res.status(200).json({ mjs: "Producto se elimino correctamente" });
//     }
//     catch (err) {
//         res.status(500).json({ msj: "Error al eliminar el producto", error: err.message })
//     }

// }

