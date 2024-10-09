import { Request, Response } from "express";
import Module, { IModule } from "../models/Module.js";
import Chapter, { IChapter } from "../models/Chapter.js";
import mongoose, { Types } from "mongoose";

interface ChapterInput {
      _id?: string; // Optional for new chapters
      title: string;
      description: string;
      content: {
            type: "video" | "text";
            url: string;
      };
      order?: number; // Optional if order is to be auto-assigned
}

interface UpdateModuleInput {
      title?: string;
      description?: string;
      imgUrl?: string;
      chapters: ChapterInput[];
}

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
            const chapters = await Chapter.find({ moduleId: id }).sort({ order: 1 });
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
// controllers/moduleController.ts

export const createModule = async (req: Request, res: Response) => {
      const { title, description, imgUrl, chapters }: UpdateModuleInput = req.body;

      // Validate required fields
      if (!title || !description) {
            return res.status(400).json({ message: "Title and description are required" });
      }

      // Validate chapters array
      if (!Array.isArray(chapters)) {
            return res.status(400).json({ message: "Chapters should be an array" });
      }

      try {
            // Start a session for transaction
            const session = await mongoose.startSession();
            session.startTransaction();

            // Create the module
            const newModule = new Module({
                  title,
                  description,
                  imgUrl: imgUrl || "",
                  chapters: [], // Will populate after creating chapters
            });

            await newModule.save({ session });

            // Iterate over chapters and create them
            for (let i = 0; i < chapters.length; i++) {
                  const chapterData = chapters[i];
                  const chapterOrder = chapterData.order !== undefined ? chapterData.order : i + 1;

                  const newChapter = new Chapter({
                        moduleId: newModule._id,
                        title: chapterData.title || "",
                        description: chapterData.description || "",
                        content: chapterData.content || { type: "text", url: "" },
                        order: chapterOrder,
                  });

                  await newChapter.save({ session });
                  newModule.chapters.push(newChapter._id);
            }

            // Save the module with chapters
            await newModule.save({ session });

            // Commit the transaction
            await session.commitTransaction();
            session.endSession();

            // Optionally, populate chapters for the response
            const populatedModule = await Module.findById(newModule._id)
                  .populate({
                        path: "chapters",
                        options: { sort: { order: 1 } },
                  })
                  .exec();

            return res
                  .status(201)
                  .json({ message: "Module created successfully", module: populatedModule });
      } catch (error) {
            console.error("Error creating module:", error);
            return res.status(500).json({ message: "Server error while creating module" });
      }
};

// update modules
export const updateModule = async (req: Request, res: Response) => {
      const { id } = req.params;
      const { title, description, imgUrl, chapters }: UpdateModuleInput = req.body;
      console.log("Updating module with id:", {
            title,
            description,
            imgUrl,
            chapters,
      });

      // Validate module ID
      if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid module ID" });
      }

      // Validate chapters array
      if (!Array.isArray(chapters)) {
            return res.status(400).json({ message: "Chapters should be an array" });
      }

      try {
            // Start a session for transaction
            const session = await mongoose.startSession();
            session.startTransaction();

            // Find the module
            const module = await Module.findById(id).session(session).exec();
            if (!module) {
                  await session.abortTransaction();
                  session.endSession();
                  return res.status(404).json({ message: "Module not found" });
            }

            // Update module fields
            if (title !== undefined) module.title = title;
            if (description !== undefined) module.description = description;
            if (imgUrl !== undefined) module.imgUrl = imgUrl;

            // Fetch existing chapters in the module
            const existingChapters = (await Chapter.find({ moduleId: module._id })
                  .session(session)
                  .exec()) as IChapter[];

            // Create a map for existing chapters
            const existingChaptersMap: { [key: string]: IChapter } = {};
            existingChapters.forEach((chapter) => {
                  existingChaptersMap[chapter._id.toString()] = chapter;
            });

            // Prepare new chapters array
            const newChaptersOrder: Types.ObjectId[] = [];

            for (let i = 0; i < chapters.length; i++) {
                  const chapterData = chapters[i];
                  const chapterOrder = chapterData.order !== undefined ? chapterData.order : i + 1;

                  if (chapterData._id) {
                        // Existing chapter - update
                        const existingChapter = existingChaptersMap[chapterData._id];
                        if (existingChapter) {
                              existingChapter.title = chapterData.title || existingChapter.title;
                              existingChapter.description =
                                    chapterData.description || existingChapter.description;
                              existingChapter.content =
                                    chapterData.content || existingChapter.content;
                              existingChapter.order = chapterOrder;
                              await existingChapter.save({ session });
                              newChaptersOrder.push(existingChapter._id);
                              // Remove from map to track which chapters remain
                              delete existingChaptersMap[chapterData._id];
                        } else {
                              // Chapter ID provided but not found - handle as error or create new
                              console.warn(
                                    `Chapter with ID ${chapterData._id} not found in module`
                              );
                              // Optionally, create a new chapter or skip
                        }
                  } else {
                        // New chapter - create
                        const newChapter = new Chapter({
                              moduleId: module._id,
                              title: chapterData.title || "",
                              description: chapterData.description || "",
                              content: chapterData.content || { type: "text", url: "" },
                              order: chapterOrder,
                        });
                        await newChapter.save({ session });
                        newChaptersOrder.push(newChapter._id);
                  }
            }

            // Any remaining chapters in existingChaptersMap are to be removed
            const chaptersToRemove = Object.values(existingChaptersMap);
            if (chaptersToRemove.length > 0) {
                  const removeIds = chaptersToRemove.map((ch) => ch._id);
                  await Chapter.deleteMany({ _id: { $in: removeIds } }).session(session);
            }

            // Update module's chapters array to the new order
            module.chapters = newChaptersOrder;

            // Save the module
            await module.save({ session });

            // Commit the transaction
            await session.commitTransaction();
            session.endSession();

            // Optionally, populate the chapters for the response
            const updatedModule = await Module.findById(id)
                  .populate({
                        path: "chapters",
                        options: { sort: { order: 1 } },
                  })
                  .exec();

            return res
                  .status(200)
                  .json({ message: "Module updated successfully", module: updatedModule });
      } catch (error) {
            console.error("Error updating module:", error);
            return res.status(500).json({ message: "Server error while updating module" });
      }
};

// upload chapter
export const uploadChapter = async (req: Request, res: Response): Promise<Response> => {
      console.log("uploading chapter");
      try {
            const { moduleId } = req.params;
            const { chapter } = req.body;

            // Validate input
            if (!moduleId || !chapter) {
                  return res
                        .status(400)
                        .json({ message: "Module ID and chapter data are required" });
            }

            // Extract chapter fields
            const { title, description, content, order } = chapter;

            console.log(
                  `Chapter title: ${title}, description: ${description}, content: ${content}, order: ${order}`
            );

            // Validate chapter object fields
            if (!title || !description || !content || !content.url || !content.type) {
                  return res.status(400).json({ message: "Invalid chapter data" });
            }

            // Start a session for transaction
            const session = await mongoose.startSession();
            session.startTransaction();

            try {
                  // Find the module
                  const module = await Module.findById(moduleId).session(session).exec();
                  if (!module) {
                        console.log("Module not found");
                        await session.abortTransaction();
                        session.endSession();
                        return res.status(404).json({ message: "Module not found" });
                  }

                  // Fetch existing chapters to determine order
                  const existingChapters = await Chapter.find({ moduleId: module._id })
                        .session(session)
                        .exec();

                  let newOrder: number;

                  if (order !== undefined && order !== null) {
                        // User has specified an order

                        // Parse 'order' to ensure it's a number
                        const parsedOrder = typeof order === "number" ? order : parseInt(order, 10);

                        if (isNaN(parsedOrder)) {
                              await session.abortTransaction();
                              session.endSession();
                              return res.status(400).json({ message: "Order must be a number" });
                        }

                        // Validate the order value
                        if (parsedOrder < 1 || parsedOrder > existingChapters.length + 1) {
                              await session.abortTransaction();
                              session.endSession();
                              return res.status(400).json({ message: "Invalid order value" });
                        }

                        newOrder = parsedOrder;

                        // Increment the order of existing chapters at or beyond the specified order
                        await Chapter.updateMany(
                              { moduleId: module._id, order: { $gte: newOrder } },
                              { $inc: { order: 1 } }
                        ).session(session);
                  } else {
                        // No order specified; insert at the beginning
                        newOrder = 1;

                        // Increment the order of all existing chapters to make room at the beginning
                        await Chapter.updateMany(
                              { moduleId: module._id },
                              { $inc: { order: 1 } }
                        ).session(session);
                  }

                  console.log(`Assigning order: ${newOrder}`);

                  // Create the new chapter with the determined order
                  const newChapter = new Chapter({
                        moduleId: module._id,
                        title,
                        description,
                        content,
                        order: newOrder,
                  });

                  console.log("New Chapter before saving:", newChapter);

                  await newChapter.save({ session });

                  console.log(`Created chapter with order ${newChapter.order}`);

                  // Insert the new chapter's _id into module.chapters array at the correct position
                  // Since 'order' starts from 1, and array index starts from 0, insert at newOrder -1
                  const chapterObjectId = newChapter._id as Types.ObjectId;
                  module.chapters.splice(newOrder - 1, 0, chapterObjectId);

                  console.log(`Module chapters after insertion:`, module.chapters);

                  await module.save({ session });

                  // Commit the transaction
                  await session.commitTransaction();
                  session.endSession();

                  return res.status(200).json({
                        message: "Chapter uploaded successfully",
                        chapterId: newChapter._id,
                  });
            } catch (error: unknown) {
                  await session.abortTransaction();
                  session.endSession();
                  console.error("Error uploading chapter:", error);
                  return res.status(500).json({ message: "Error uploading chapter" });
            }
      } catch (error: unknown) {
            console.error("Error uploading chapter:", error);
            return res.status(500).json({ message: "Error uploading chapter" });
      }
};

// update chapter
export const updateChapter = async (req: Request, res: Response): Promise<Response> => {
      try {
            console.log("Updating chapter with id:", req.params.id);
            // Validate input
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
