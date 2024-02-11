import path from 'path';
import express from 'express';
import AppError from '../utils/appError.js';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, 'client/src/assets/uploads/original');
    if (process.env.NODE_ENV === 'development') {
      cb(null, 'client/src/assets/uploads/original');
    } else {
      cb(null, 'uploads/original');
    }
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});

function fileFilter(req, file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new AppError('PNG, JPG, JPEG only', 400), false);
  }
}

const upload = multer({
  storage,
  fileFilter,
});

router.post('/', upload.single('image'), (req, res) => {
  res.send({
    message: 'Image Upload',
    image: `${req.file.originalname}`,
  });
});

export default router;
