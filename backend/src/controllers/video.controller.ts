import { Request, Response } from "express";
import Video from "../models/Video.js";
import Module from "../models/Module.js";
import fs from "fs/promises";

import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface IUploadRequest extends Request {
      file?: Express.Multer.File;
}

interface ICreateRequest extends Request {
      body: {
            title: string;
            content: string;
            videoId: string;
      };
}

interface IModuleRequest extends Request {
      params: {
            moduleId: string;
      };
}

export const uploadVideo = async (req: IUploadRequest, res: Response): Promise<Response> => {
      console.log("Uploading video...");
      try {
            const videoFile = req.file;

            if (!videoFile) {
                  return res.status(400).json({ message: "Video file is required" });
            }

            const videoDir = path.join(__dirname, "../../uploads/videos");
            const videoPath = path.join(videoDir, `${Date.now()}_${videoFile.originalname}`);

            await fs.mkdir(videoDir, { recursive: true });
            await fs.writeFile(videoPath, videoFile.buffer);

            const video = new Video({
                  filePath: videoPath,
                  // other fields if necessary
            });

            await video.save();
            return res.status(201).json(video);
      } catch (error: any) {
            return res.status(500).json({ message: error.message });
      }
};

export const createModule = async (req: ICreateRequest, res: Response): Promise<Response> => {
      console.log("Creating Module..");
      try {
            const { title, content, videoId } = req.body;

            const lastModule = await Module.findOne().sort({ order: -1 });
            const nextOrder = lastModule ? lastModule.order + 1 : 1;

            const moduleData = new Module({
                  title,
                  content,
                  order: nextOrder,
                  video: videoId,
            });

            await moduleData.save();
            return res.status(201).json(moduleData);
      } catch (error: any) {
            return res.status(500).json({ message: error.message });
      }
};

export const getModuleDetails = async (req: IModuleRequest, res: Response): Promise<Response> => {
      try {
            const { moduleId } = req.params;

            const totalModules = await Module.countDocuments();
            const currentModule = await Module.findById(moduleId);

            if (!currentModule) {
                  return res.status(404).json({ message: "Module not found" });
            }

            const nextModule = await Module.findOne({ order: currentModule.order + 1 });

            return res.status(200).json({
                  totalModules,
                  currentModule,
                  nextModuleTitle: nextModule ? nextModule.title : null,
            });
      } catch (error: any) {
            return res.status(500).json({ message: error.message });
      }
};
