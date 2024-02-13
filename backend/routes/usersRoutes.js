import express from "express";
import { registerUser, loginUser } from "../controllers/usersController.js";
const router = express.Router();

// Register USER request
router.post("/", registerUser);

// Login USER request
router.post("/login", loginUser);

export { router as usersRoutes };
