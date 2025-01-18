import multer, { StorageEngine } from 'multer';
import type { Request } from "express";

const imageStorage: StorageEngine = multer.diskStorage({
  filename: (req: Request, file, cb) => {
    cb(null, `${new Date().getTime()}-${file.originalname}`);
  }
});

const handleImage = multer({
  storage: imageStorage
}).single('image_url');

export default handleImage;