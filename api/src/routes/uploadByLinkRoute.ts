import { Router } from 'express';
import { readFileSync, unlinkSync } from 'fs';
import imageDownloader from 'image-downloader';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';

const uploadByLinkRoute = Router();

const __dirname = resolve(fileURLToPath(import.meta.url), '../../..');

uploadByLinkRoute.post('/upload-by-link', async (req, res) => {
  const { link } = req.body;

  const newName = 'photo' + Date.now() + '.jpg';
  try {
    await imageDownloader.image({
      url: link,
      dest: __dirname + '/uploads/' + newName,
    });

    // let url = '';
    const { secure_url: url } = await cloudinary.uploader.upload(
      __dirname + '/uploads/' + newName,
      {
        folder: 'booking-app',
      }
    );

    unlinkSync(__dirname + '/uploads/' + newName);
    res.json(url);
    // res.json(newName);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

export default uploadByLinkRoute;
