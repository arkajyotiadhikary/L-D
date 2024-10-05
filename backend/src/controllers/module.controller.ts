import { Request, Response } from "express";
import Module, { IModule } from "../models/Module.js";
import Chapter, { IChapter } from "../models/Chapter.js";
// get all modules
export const getAllModules = async (req: Request, res: Response): Promise<Response> => {
      try {
            const modules = await Module.find().sort({ order: 1 });
            return res.status(200).json(modules);
      } catch (error: any) {
            return res.status(500).json({ message: error.message });
      }
};

// get module by id
export const getModuleById = async (req: Request, res: Response): Promise<Response> => {
      try {
            const { id } = req.params;
            const module = await Module.findOne({ _id: id });
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

// get chapter by id
export const getChapterById = async (req: Request, res: Response): Promise<Response> => {
      try {
            const { id } = req.params;
            const chapter = await Chapter.findOne({ _id: id });
            return res.status(200).json(chapter);
      } catch (error: any) {
            return res.status(500).json({ message: error.message });
      }
};

// create modules
export const createModule = async (req: Request, res: Response): Promise<Response> => {
      console.debug("createModule called");
      try {
            const { title, description, imgUrl, chapters } = req.body;

            // Create new module
            const newModule = new Module({
                  title,
                  description,
                  imgUrl,
            });

            const savedModule = await newModule.save();
            console.debug(`Created module: ${savedModule._id}`);

            // Create chapters with automatic order
            const savedChapters = await Promise.all(
                  chapters.map(
                        async (
                              chapter: {
                                    title: string;
                                    description: string;
                                    content: { type: "video" | "text"; url: string };
                              },
                              index: number
                        ) => {
                              // Find last chapter's order for this module
                              const lastChapter = await Chapter.findOne({
                                    moduleId: savedModule._id,
                              }).sort({ order: -1 });

                              const newChapter = new Chapter({
                                    moduleId: savedModule._id,
                                    title: chapter.title,
                                    description: chapter.description,
                                    content: chapter.content,
                                    order: lastChapter ? lastChapter.order + 1 : 1, // Auto-increment order
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

            // Validate input
            if (!moduleId || !chapter) {
                  return res
                        .status(400)
                        .json({ message: "Module ID and chapter data are required" });
            }

            const module = await Module.findById(moduleId);
            if (!module) {
                  console.log("Module not found");
                  return res.status(404).json({ message: "Module not found" });
            }

            // Validate chapter object fields
            const { title, description, content } = chapter;
            if (!title || !description || !content || !content.url || !content.type) {
                  return res.status(400).json({ message: "Invalid chapter data" });
            }

            // Create new chapter
            const newChapter = new Chapter({
                  moduleId: module._id,
                  title,
                  description,
                  content,
            });

            await newChapter.save();
            console.log(`Created chapter: ${newChapter._id}`);

            return res
                  .status(200)
                  .json({ message: "Chapter uploaded successfully", chapterId: newChapter._id });
      } catch (error: unknown) {
            console.error("Error uploading chapter:", error);
            return res.status(500).json({ message: "Error uploading chapter" });
      }
};

// update chapter
export const updateChapter = async (req: Request, res: Response): Promise<Response> => {
      try {
            const { id } = req.params;
            const updatedChapter = await Chapter.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedChapter) {
                  return res.status(404).json({ message: "Chapter not found" });
            }
            return res
                  .status(200)
                  .json({ message: "Chapter updated successfully", updatedChapter });
      } catch (error) {
            return res.status(500).json({ message: "Error updating chapter" });
      }
};

// upload assignment

// update modules
export const updateModule = async (req: Request, res: Response): Promise<Response> => {
      try {
            const { id } = req.params;
            const updatedModule = await Module.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedModule) {
                  return res.status(404).json({ message: "Module not found" });
            }
            return res.status(200).json({ message: "Module updated successfully", updatedModule });
      } catch (error) {
            return res.status(500).json({ message: "Error updating module" });
      }
};

// delete modules
export const deleteModule = async (req: Request, res: Response): Promise<Response> => {
      try {
            const { id } = req.params;
            const deletedModule = await Module.findByIdAndDelete(id);
            if (!deletedModule) {
                  return res.status(404).json({ message: "Module not found" });
            }
            return res.status(200).json({ message: "Module deleted successfully" });
      } catch (error) {
            return res.status(500).json({ message: "Error deleting module" });
      }
};
