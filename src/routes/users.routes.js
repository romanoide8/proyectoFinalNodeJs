import express from "express";
import { getAllUsers, getUserById, createUser, updateUser, loginUser } from "../controllers/users.controller.js"
import { basicAuth, checkAdmin } from "../middlewares/authentication.js"

const router = express.Router();


router.get("/", getAllUsers);
router.get("/:id", getUserById);

router.post("/", basicAuth, checkAdmin, createUser);
router.post("/login", loginUser);


router.put("/:id", updateUser);


export default router