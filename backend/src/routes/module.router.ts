import express from "express";
import { uploadVideo, createModule, getModuleDetails } from "../controllers/video.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multerConfig.js";

const router = express.Router();

// Route for uploading a video (protected)
router.post("/api/videos/upload", authMiddleware, upload.single("video"), uploadVideo);

// Route for creating a module (protected)
router.post("/api/modules", authMiddleware, createModule);

// Route for getting module details (public)
router.get("/api/modules/:moduleId", getModuleDetails);

export default router;
