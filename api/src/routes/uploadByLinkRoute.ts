import { Router } from 'express';
import imageDownloader from 'image-downloader';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

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
    res.json(newName);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

export default uploadByLinkRoute;
