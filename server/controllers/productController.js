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
    .trim()
    .split(' ')
    .join('-');

  const ext = req.body.image.split('.')[1];

  const formattedPrice = Number.parseFloat(req.body.price, 10)
    .toFixed(2)
    .toString();

  const productData = {
    name: req.body.name,
    description: req.body.description,
    variants: [
      {
        price: formattedPrice,
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

  const oldImageName = product.image.split('.')[0];
  const oldImageExt = product.image.split('.')[1];
  const newImageExt = productImage?.split('.')[1];
  const newFileName = productName
    .toLowerCase()
    .replace(/\s\s+/g, ' ')
    .replace(/'+/g, '')
    .trim()
    .split(' ')
    .join('-');

  // if they only changed the name
  if (productName !== previousName && !userChangedImageFile) {
    clones.forEach(async (clone) => {
      fs.rename(
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
  // if they changed the name and image or img ext then delete unused images. don't need to delete every image upload because if the name and extension are the same the cloneRoutes file will replace the old images with the new
  if (
    userChangedImageFile &&
    (productName !== previousName || oldImageExt !== newImageExt)
  ) {
    clones.forEach(async (clone) => {
      deleteClones(oldImageName, clone.path, oldImageExt, clone.size[0]);
    });
  }

  const formattedPrice = Number.parseFloat(productPrice, 10)
    .toFixed(2)
    .toString();

  const productData = {
    $set: {
      'variants.0': {
        price: formattedPrice,
        size: productSize,
        stock: productStock,
      },
    },
    name: productName,
    description: productDescription,
    image: oldImageName + '.' + oldImageExt,
  };

  if (productImage) {
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
// @access ADMIN
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

// @desc create product variant
// @route PATCH api/v1/products/create-variant/:id
// @access ADMIN
const createVariant = catchAsync(async (req, res, next) => {
  const productId = req.params.id;
  const newVariant = req.body.variant;

  if (!newVariant.price || !newVariant.size || !newVariant.stock) {
    return next(new AppError('Please fill out price, size, and stock', 400));
  }

  const product = await Product.findById(productId);

  if (!product) {
    return res
      .status(404)
      .json({ status: 'fail', message: 'Product not found' });
  }

  newVariant.price = Number.parseFloat(newVariant.price, 10)
    .toFixed(2)
    .toString();

  product.variants.push(newVariant);

  await product.save();

  return res.status(200).json({
    status: 'success',
    message: 'Variant added successfully',
    product,
  });
});

// @desc edit product variant
// @route PATCH api/v1/products/edit-variant/:id
// @access ADMIN
const editVariant = catchAsync(async (req, res, next) => {
  const productId = req.params.id;
  const newVariant = req.body.variant;

  if (!newVariant.price || !newVariant.size || !newVariant.stock) {
    return next(new AppError('Please fill out price, size, and stock', 400));
  }

  const product = await Product.findById(productId);

  if (!product) {
    return res
      .status(404)
      .json({ status: 'fail', message: 'Product not found' });
  }

  // find variant and replace data
  const updatedVariants = product.variants.map((variant) => {
    const newVariantId = newVariant.id.toString();
    const oldVariantId = JSON.stringify(variant._id).replace(/['"]+/g, '');

    const formattedPrice = Number.parseFloat(newVariant.price, 10)
      .toFixed(2)
      .toString();

    if (newVariantId === oldVariantId) {
      return {
        price: formattedPrice,
        size: newVariant.size,
        stock: newVariant.stock,
      };
    } else return variant;
  });

  product.variants = updatedVariants;
  await product.save();

  return res.status(200).json({
    status: 'success',
    message: 'Variant edit successful',
    product,
  });
});

// @desc delete product variant
// @route delete api/v1/products/delete-variant/:id
// @access ADMIN
const deleteVariant = catchAsync(async (req, res, next) => {
  const productId = req.params.id;
  const variantId = req.body.variantId;

  const product = await Product.findById(productId);

  if (!product) {
    return res
      .status(404)
      .json({ status: 'fail', message: 'Product not found' });
  }

  // find variant and replace data
  const updatedVariants = product.variants.filter((variant) => {
    const variantToDeleteId = variantId.toString();
    const id = JSON.stringify(variant._id).replace(/['"]+/g, '');

    if (variantToDeleteId !== id) {
      return variant;
    }
  });

  product.variants = updatedVariants;
  await product.save();

  return res.status(204).send();
});

export {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  createVariant,
  editVariant,
  deleteVariant,
};
