import { Request, Response } from "express";
import Module, { IModule, IChapter } from "../models/Module.js";
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
            const { moduleId } = req.params;
            const module = await Module.findById(moduleId);
            return res.status(200).json(module);
      } catch (error: any) {
            return res.status(500).json({ message: error.message });
      }
};

// create modules
export const createModule = async (req: Request, res: Response): Promise<Response> => {
      try {
            const newModule: IModule = new Module(req.body);
            const saveModule = await newModule.save();
            return res.status(201).json(saveModule);
      } catch (error) {
            return res.status(400).json({ message: "Error creating module", module });
      }
};

// upload chapter
export const uploadChapter = async (req: Request, res: Response): Promise<Response> => {
      try {
            const { moduleId } = req.params;
            const { chapter }: { chapter: IChapter } = req.body;
            console.log({
                  moduleId,
                  chapter,
            });
            const module = await Module.findById(moduleId);
            if (!module) {
                  return res.status(404).json({ message: "Module not found" });
            }
            module.chapters.push(chapter);
            await module.save();
            return res.status(200).json(module);
      } catch (error) {
            return res.status(500).json({ message: "Error uploading chapter" });
      }
};

// upload assignment

// update modules

// delete modules
