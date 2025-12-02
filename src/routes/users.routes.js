import express from "express";
import { getAllUsersController, getUserByIdController, createUserController, updateUserController, loginUserController } from "../controllers/users.controller.js"
import { basicAuth, checkAdmin } from "../middlewares/authentication.js"

const router = express.Router();


router.get("/", getAllUsersController);
router.get("/:id", getUserByIdController);

router.post("/", basicAuth, checkAdmin, createUserController);
router.post("/login", loginUserController);


router.put("/:id", updateUserController);


export default router