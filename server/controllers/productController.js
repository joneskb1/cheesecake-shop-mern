import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import Product from '../models/productModel.js';

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
    image: req.body.image,
  };

  const product = await Product.create(productData);

  if (!product) return next(new AppError('Could not create product', 400));

  res.status(200).json({
    status: 'success',
    data: {
      product,
    },
  });
});

export { getAllProducts, createProduct, getProduct };
