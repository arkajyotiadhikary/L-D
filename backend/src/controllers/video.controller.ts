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

            const videoDir = path.join(__dirname, "../../../frontend/src/assets/videos");
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

            console.log({ title, content, videoId });

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

            // Find the current module by ID and populate the video field
            const currentModule = await Module.findById(moduleId).populate("video");

            if (!currentModule) {
                  return res.status(404).json({ message: "Module not found" });
            }

            // Type casting to ensure TypeScript knows currentModule.video is a Video document
            const video = (currentModule.video as any)
                  ? { filePath: (currentModule.video as any).filePath }
                  : null;

            // Find the total number of modules
            const totalModules = await Module.countDocuments();

            // Find the next module
            const nextModule = await Module.findOne({ order: currentModule.order + 1 });
            const prevModule = await Module.findOne({ order: currentModule.order - 1 });

            return res.status(200).json({
                  totalModules,
                  currentModule: {
                        title: currentModule.title,
                        content: currentModule.content,
                        order: currentModule.order,
                        video: video,
                  },
                  nextModuleTitle: nextModule ? nextModule.title : null,
                  nextModuleId: nextModule ? nextModule._id : null,
                  prevModuleTitle: prevModule ? prevModule.title : null,
                  prevModuleId: prevModule ? prevModule._id : null,
            });
      } catch (error: any) {
            return res.status(500).json({ message: error.message });
      }
};
