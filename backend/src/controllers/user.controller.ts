import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { User } from '../models/User.js';

dotenv.config();

export const registerUser = async (req: Request, res: Response): Promise<void> => {

  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (user) {
      res.status(400).json({ message: "User already exists." });
      return;
    }

    // Hash the passowd
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      username,
      password: hashedPassword
    })

    await newUser.save();

    // Generate jwt token with the user id
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET as string, {
      expiresIn: '24h'
    })
    res.status(200).json({ token })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });

  }
}

export const signInUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: '24h',
    });

    res.status(200).json({ token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
}


