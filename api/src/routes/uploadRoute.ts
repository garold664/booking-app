import { Router } from 'express';

// import multerMiddleware from '../lib/multerMiddleware.ts';
import { v2 as cloudinary } from 'cloudinary';
import multerMiddleware from '../lib/multerMiddleware.js';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const router = Router();
router.post(
  '/upload',
  multerMiddleware.array('photos', 100),
  async (req, res) => {
    if (!Array.isArray(req.files)) return;
    const uploadedFiles = await Promise.all(
      [...req.files].map(async (file) => {
        const { secure_url: url } = await cloudinary.uploader.upload(
          file.path,
          {
            // unique_filename: false,
            folder: 'booking-app',
          }
        );
        return url;
      })
    );
    res.status(200).json(uploadedFiles);
  }
);

export default router;
