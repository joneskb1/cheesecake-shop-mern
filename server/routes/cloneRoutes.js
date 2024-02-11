import express from 'express';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import AppError from '../utils/appError.js';

const router = express.Router();

let outputPathBase;
if (process.env.NODE_ENV === 'development') {
  outputPathBase = '/client/src/assets/uploads/clones';
} else {
  outputPathBase = '/uploads/clones';
}

const clones = [
  { path: `${outputPathBase}/xx-large`, size: [732, 484] },
  { path: `${outputPathBase}/x-large`, size: [436, 289] },
  { path: `${outputPathBase}/large`, size: [354, 266] },
  { path: `${outputPathBase}/medium`, size: [265, 199] },
  { path: `${outputPathBase}/small`, size: [170, 112] },
  { path: `${outputPathBase}/x-small`, size: [75, 60] },
  { path: `${outputPathBase}/xx-small`, size: [38, 29] },
];

router.post('/', (req, res, next) => {
  const __dirname = path.resolve();

  async function cloneImage() {
    try {
      const pathToClone =
        process.env.NODE_ENV === 'development'
          ? 'client/src/assets/uploads/original/'
          : 'uploads/original/';

      const image = await fs.promises.readFile(
        path.join(__dirname, pathToClone, req.body.productImage)
      );

      clones.forEach(async (clone) => {
        const productName = req.body.productName
          .toLowerCase()
          .replace(/\s\s+/g, ' ')
          .replace(/'+/g, '')
          .trim()
          .split(' ')
          .join('-');

        const ext = req.body.productImage.split('.')[1];
        const imageFileName = `${productName}-${clone.size[0]}w.${ext}`;

        await sharp(image)
          .resize(clone.size[0], clone.size[1])
          .jpeg({ quality: 85 })
          .toFile(path.join(__dirname, clone.path, imageFileName));
      });
    } catch (error) {
      return next(new AppError('error cloning images', 500));
    }
  }

  cloneImage();

  res.status(200).json({
    status: 'success',
  });
});

export default router;
