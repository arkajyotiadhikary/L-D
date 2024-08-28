import multer, { FileFilterCallback, StorageEngine } from "multer";
import { Request } from "express";

// Setup storage for Multer to use memory storage
const storage = multer.memoryStorage();

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
      // Only allow video files
      if (file.mimetype.startsWith("video/")) {
            cb(null, true);
      } else {
            cb(null, false);
      }
};

const upload = multer({ storage, fileFilter });

export default upload;
