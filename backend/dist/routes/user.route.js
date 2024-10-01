import { Router } from "express";
import { registerUser, signInUser, updateUserProgress, getUserProgress, createUsers, } from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = Router();
router.post("/register", registerUser);
router.post("/login", signInUser);
router.put("/api/users/progress", authMiddleware, updateUserProgress);
router.get("/api/users/progress", authMiddleware, getUserProgress);
// SUPER ADMIN
// create users
router.post("/api/users/create", createUsers);
export default router;
