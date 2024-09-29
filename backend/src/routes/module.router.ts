import express from "express";
import {
      createModule,
      getAllModules,
      getModuleById,
      uploadChapter,
} from "../controllers/module.controller.js";

const router = express.Router();

// Route for creating a module (protected)
router.post("/api/module/create", createModule);

// Router for getting all the modules
router.get("/api/modules", getAllModules);

// Router for get module by id
router.get("/api/module/:moduleId", getModuleById);

// Router for uploading a chapter
router.post("/api/module/:moduleId/chapter", uploadChapter);

// Route for uploading a video (protected)
// router.post("/api/videos/upload", authMiddleware, upload.single("video"), uploadVideo);

// Route for getting module details (public)
// router.get("/api/modules/:moduleId", getModuleDetails);

export default router;
