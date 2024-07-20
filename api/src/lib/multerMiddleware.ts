import multer from 'multer';

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const multerMiddleware = multer({
  storage,
});

export default multerMiddleware;
