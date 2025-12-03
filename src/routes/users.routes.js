import express from "express";
import { getAllUsersController, getUserByIdController, createUserController, updateUserController, loginUserController, deleteUserByIdController } from "../controllers/users.controller.js"
import { basicAuth, checkAdmin } from "../middlewares/authentication.js"

const router = express.Router();


router.get("/", getAllUsersController);
router.get("/:id", getUserByIdController);

router.post("/create", createUserController);
router.post("/login", basicAuth, loginUserController);

router.put("/:id", updateUserController);

router.delete("/:id", basicAuth, checkAdmin, deleteUserByIdController);

export default router