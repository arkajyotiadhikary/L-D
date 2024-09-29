import { Request, Response } from "express";
import Module, { IModule } from "../models/Module.js";
import Chapter, { IChapter } from "../models/Chapter.js";
// get all modules
export const getAllModules = async (req: Request, res: Response): Promise<Response> => {
      try {
            const modules = await Module.find();
            return res.status(200).json(modules);
      } catch (error: any) {
            return res.status(500).json({ message: error.message });
      }
};

// get module by id
export const getModuleById = async (req: Request, res: Response): Promise<Response> => {
      try {
            const { id } = req.params;
            const module = await Module.findOne({ order: id });
            return res.status(200).json(module);
      } catch (error: any) {
            return res.status(500).json({ message: error.message });
      }
};

// get chapters by module id
export const getChaptersByModuleId = async (req: Request, res: Response): Promise<Response> => {
      try {
            const { id } = req.params;
            console.log("module id ", id);
            const chapters = await Chapter.find({ moduleId: id });
            return res.status(200).json(chapters);
      } catch (error: any) {
            return res.status(500).json({ message: error.message });
      }
};

// create modules
export const createModule = async (req: Request, res: Response): Promise<Response> => {
      console.debug("createModule called");
      try {
            const { title, details, chapters, order, imgUrl } = req.body;
            const newModule: IModule = new Module({
                  title,
                  details,
                  order,
                  imgUrl,
            });
            const savedModule = await newModule.save();
            console.debug(`Created module: ${savedModule._id}`);

            const savedChapters = await Promise.all(
                  chapters.map(
                        async (chapter: {
                              title: string;
                              description: string;
                              content: { type: "video" | "text"; url: string };
                        }) => {
                              const newChapter = new Chapter({
                                    moduleId: savedModule._id,
                                    ...chapter,
                              });
                              const savedChapter = await newChapter.save();
                              console.debug(`Created chapter: ${savedChapter._id}`);
                              return savedChapter;
                        }
                  )
            );

            return res.status(201).json({ module: savedModule, chapters: savedChapters });
      } catch (error) {
            console.error("Error creating module:", error);
            return res.status(400).json({ message: "Error creating module", error });
      }
};

// upload chapter
export const uploadChapter = async (req: Request, res: Response): Promise<Response> => {
      try {
            const { moduleId } = req.params;
            const { chapter } = req.body;
            console.log({
                  moduleId,
                  chapter,
            });
            const module = await Module.findById(moduleId);
            if (!module) {
                  return res.status(404).json({ message: "Module not found" });
            }
            const newChapter = new Chapter({
                  moduleId: module._id,
                  ...chapter,
            });
            await newChapter.save();
            return res.status(200).json({ message: "Chapter uploaded successfully" });
      } catch (error) {
            return res.status(500).json({ message: "Error uploading chapter" });
      }
};

// upload assignment

// update modules

// delete modules
