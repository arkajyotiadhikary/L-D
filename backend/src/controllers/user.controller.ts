import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { User } from "../models/User.js";

dotenv.config();

// Replace this with the ID of the first module in your system
const INITIAL_MODULE_ID = "66cecb8b389b58336dd4ce0a";

interface AuthRequest extends Request {
      userId?: string;
}

export const registerUser = async (req: Request, res: Response): Promise<void> => {
      const { username, password } = req.body;

      try {
            const user = await User.findOne({ username });
            if (user) {
                  res.status(400).json({ message: "User already exists." });
                  return;
            }

            // Hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Create new user with initial progress
            const newUser = new User({
                  username,
                  password: hashedPassword,
                  progress: {
                        completedModules: [],
                        currentModule: INITIAL_MODULE_ID,
                  },
            });

            await newUser.save();

            // Generate jwt token with the user id and progress
            const token = jwt.sign(
                  {
                        userId: newUser._id,
                        progress: newUser.progress,
                  },
                  process.env.JWT_SECRET as string,
                  {
                        expiresIn: "24h",
                  }
            );
            res.status(200).json({ token });
      } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error." });
      }
};

export const signInUser = async (req: Request, res: Response): Promise<void> => {
      const { username, password } = req.body;
      try {
            const user = await User.findOne({ username });
            if (!user) {
                  res.status(400).json({ message: "Invalid credentials" });
                  return;
            }

            const checkPassword = await bcrypt.compare(password, user.password);
            if (!checkPassword) {
                  res.status(400).json({ message: "Invalid credentials" });
                  return;
            }

            // Generate jwt token with the user id and progress
            const token = jwt.sign(
                  {
                        userId: user._id,
                        progress: user.progress,
                  },
                  process.env.JWT_SECRET as string,
                  {
                        expiresIn: "24h",
                  }
            );

            res.status(200).json({ token });
      } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error." });
      }
};

export const updateUserProgress = async (req: AuthRequest, res: Response): Promise<void> => {
      const userId = req.userId;
      console.log({ userId });
      const { currentModule, completedModule } = req.body;

      console.log({ currentModule, completedModule });

      try {
            const user = await User.findById(userId);
            if (!user) {
                  res.status(404).json({ message: "User not found" });
                  return;
            }

            // Update user's progress
            if (currentModule) {
                  user.progress.currentModule = currentModule;
            }

            if (completedModule && !user.progress.completedModules.includes(completedModule)) {
                  console.log("pushing completedModule: ", { completedModule });
                  user.progress.completedModules.push(completedModule);
            }

            await user.save();

            // Respond with updated user progress
            res.status(200).json(user.progress);
      } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error." });
      }
};

export const getUserProgress = async (req: AuthRequest, res: Response): Promise<void> => {
      const userId = req.userId;
      try {
            const user = await User.findById(userId);
            if (!user) {
                  res.status(404).json({ message: "User not found" });
                  return;
            }

            res.status(200).json(user.progress);
      } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error." });
      }
};
