import { Request, Response } from "express";
import Company, { ICompany } from "../models/Company.js";

export const createCompany = async (req: Request, res: Response) => {
      const { name, description }: ICompany = req.body;
      try {
            const newCompany = new Company({ name, description });
            await newCompany.save();
            return res.status(201).json(newCompany);
      } catch (error) {
            return res.status(500).json({ message: error });
      }
};
