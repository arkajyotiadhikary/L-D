import express from "express";
import {
      createModule,
      getAllModules,
      getModuleById,
      uploadChapter,
      getChaptersByModuleId,
      getChapterById,
      deleteModule,
      updateModule,
      updateChapter,
} from "../controllers/module.controller.js";

const router = express.Router();

// Route for creating a module (protected)
router.post("/api/module/create", createModule);

// Router for getting all the modules
router.get("/api/modules", getAllModules);

// Router for get module by id
router.get("/api/module/:id", getModuleById);

// Router for updating a module
router.put("/api/module/:id", updateModule);

// Router for getting all the chapters
router.get("/api/chapters/:id", getChaptersByModuleId);

// Router to get chapter by id
router.get("/api/chapter/:id", getChapterById);

// Router for uploading a chapter
router.post("/api/module/:moduleId/chapter", uploadChapter);

// Router for update a chapter
router.put("/api/chapter/:id", updateChapter);

// Router for deleting a module

router.delete("/api/module/:id", deleteModule);

// Route for uploading a video (protected)
// router.post("/api/videos/upload", authMiddleware, upload.single("video"), uploadVideo);

// Route for getting module details (public)
// router.get("/api/modules/:moduleId", getModuleDetails);

export default router;
