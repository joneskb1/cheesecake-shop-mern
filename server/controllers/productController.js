import path from 'path';
import fs from 'fs';

import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import Product from '../models/productModel.js';

const outputPathBase = '/client/src/assets/uploads/clones';
const __dirname = path.resolve();
const clones = [
  { path: `${outputPathBase}/xx-large`, size: [732, 484] },
  { path: `${outputPathBase}/x-large`, size: [436, 289] },
  { path: `${outputPathBase}/large`, size: [354, 266] },
  { path: `${outputPathBase}/medium`, size: [265, 199] },
  { path: `${outputPathBase}/small`, size: [170, 112] },
  { path: `${outputPathBase}/x-small`, size: [75, 60] },
  { path: `${outputPathBase}/xx-small`, size: [38, 29] },
];

function deleteClones(name, path, ext, size) {
  fs.unlink(`${__dirname}/${path}/${name}-${size}w.${ext}`, (err) => {
    if (err) {
      console.log(err);
      throw err;
    }
  });
}

function deleteOriginals() {
  const folderPath = `${__dirname}/client/src/assets/uploads/original`;
  fs.readdir(folderPath, (err, files) => {
    if (err) new AppError('issue reading directory to delete originals', 404);
    files.forEach(async (file) => {
      fs.unlink(path.join(folderPath, file), (err) => {
        if (err) new AppError('could not delete originals', 500);
      });
    });
  });
}

// @desc get products
// @route GET api/v1/products/
// @access Public
const getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    status: 'success',
    data: {
      products,
    },
  });
});

// @desc get product
// @route GET api/v1/products/:id
// @access Public
const getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) return next(new AppError('Product not found', 404));

  res.status(200).json({
    status: 'success',
    data: {
      product,
    },
  });
});

// @desc create a product
// @route POST api/v1/products/
// @access ADMIN
const createProduct = catchAsync(async (req, res, next) => {
  if (
    !req.body.name ||
    !req.body.description ||
    !req.body.size ||
    !req.body.price ||
    !req.body.stock ||
    !req.body.image
  ) {
    return next(new AppError('Please complete the form', 400));
  }

  const imgName = req.body.name
    .toLowerCase()
    .replace(/\s\s+/g, ' ')
    .replace(/'+/g, '')
    .split(' ')
    .join('-');

  const ext = req.body.image.split('.')[1];

  const productData = {
    name: req.body.name,
    description: req.body.description,
    variant: [
      {
        price: req.body.price,
        size: req.body.size,
        stock: req.body.stock,
      },
    ],
    image: imgName + '.' + ext,
  };

  const product = await Product.create(productData);

  if (!product) return next(new AppError('Could not create product', 400));

  deleteOriginals();

  res.status(200).json({
    status: 'success',
    data: {
      product,
    },
  });
});

// @desc update a product
// @route Patch api/v1/products/:id
// @access ADMIN
const updateProduct = catchAsync(async (req, res, next) => {
  const {
    id,
    productName,
    productDescription,
    previousName,
    userChangedImageFile,
    productImage,
    productPrice,
    productSize,
    productStock,
  } = req.body;

  const product = await Product.findById(id);

  // if only name changes but no image change: rename image files to new name

  if (productImage) {
  }

  const oldImageName = product.image.split('.')[0];
  const oldImageExt = product.image.split('.')[1];
  const newImageExt = productImage?.split('.')[1];
  const newFileName = productName
    .toLowerCase()
    .replace(/\s\s+/g, ' ')
    .replace(/'+/g, '')
    .split(' ')
    .join('-');

  if (productName !== previousName && !userChangedImageFile) {
    clones.forEach(async (clone) => {
      await fs.rename(
        `${__dirname}/${clone.path}/${oldImageName}-${clone.size[0]}w.${oldImageExt}`,
        `${__dirname}/${clone.path}/${newFileName}-${clone.size[0]}w.${
          newImageExt ? newImageExt : oldImageExt
        }`,
        (error) => {
          if (error) {
            console.log(error);
          }
        }
      );
    });
  }

  if (userChangedImageFile && productName !== previousName) {
    clones.forEach(async (clone) => {
      deleteClones(oldImageName, clone.path, oldImageExt, clone.size[0]);
    });
  }

  const productData = {
    name: productName,
    description: productDescription,
    variant: [
      {
        price: productPrice,
        size: productSize,
        stock: productStock,
      },
    ],
    image: oldImageName + '.' + oldImageExt,
  };

  if (productImage) {
    console.log('BACK IMG', productImage);
    productData.image = newFileName + '.' + newImageExt;
  }

  const updatedProduct = await Product.findByIdAndUpdate(id, productData, {
    new: true,
    runValidators: true,
  });

  deleteOriginals();

  res.status(200).json({
    status: 'success',
    data: {
      data: updatedProduct,
    },
  });
});

// @desc delete product
// @route Delete api/v1/products/:id
// @access Public
const deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return next(new AppError("Couldn't find product to delete", 400));
  } else {
    const productName = product.image.split('.')[0];
    const productExt = product.image.split('.')[1];

    clones.forEach(async (clone) => {
      deleteClones(productName, clone.path, productExt, clone.size[0]);
    });
  }

  res.status(204).send();
});

export {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
