import { Request, Response, Express } from 'express';
import Video from '../models/Video.js';
import Module from '../models/Module.js';
import path from 'path';
import fs from 'fs/promises';

interface IUploadRequest extends Request {
  body: {
    title: string;
    description: string;
    duration: string;
  };
  file?: Express.Multer.File;
}

interface ICreateRequest extends Request {
  body: {
    title: string;
    content: string;
    videoId: string;
  }
}

export const uploadVideo = async (req: IUploadRequest, res: Response): Promise<Response> => {
  try {
    const { title, description, duration } = req.body;
    const videoFile = req.file;

    if (!videoFile) {
      return res.status(400).json({ message: 'Video file is required' });
    }

    const videoDir = path.join(__dirname, '../../uploads/videos')
    const videoPath = path.join(videoDir, videoFile.filename);

    await fs.mkdir(videoDir, { recursive: true }); // create dir if dont exist
    await fs.writeFile(videoPath, videoFile.buffer);



    const video = new Video({
      title,
      description,
      filePath: videoPath,
      duration: parseInt(duration, 10),
    });

    await video.save();
    return res.status(201).json(video);

  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export const createModule = async (req: ICreateRequest, res: Response): Promise<Response> => {
  try {
    const { title, content, videoId } = req.body;

    const lastModule = await Module.findOne().sort({ order: -1 });
    const nextOrder = lastModule ? lastModule.order + 1 : 1;

    const moduleData = new Module({
      title,
      content,
      order: nextOrder,
      video: videoId
    });

    await moduleData.save();
    return res.status(201).json(moduleData);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}
