import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import xmlbuilder2 from 'xmlbuilder2';
import axios from 'axios';

// @desc get user orders
// @route GET api/v1/order/
// @access public
const getUserOrders = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user).populate('orders');

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: user.orders,
    },
  });
});

// @desc get user order
// @route GET api/v1/order/:id
// @access public
const getUserOrder = catchAsync(async (req, res, next) => {
  // const order = await Order.findById(req.params.id);
  const user = await User.findById(req.user).populate('orders');
  const order = user.orders.find((order) => {
    return order._id.toString() === req.params.id;
  });

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: order,
      user,
    },
  });
});

// @desc get all orders
// @route GET api/v1/order/admin/all
// @access admin
const getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find();
  res.status(200).json({
    status: 'success',
    data: {
      data: orders,
    },
  });
});

// @desc get one order
// @route GET api/v1/order/admin/:id
// @access admin
const getOneOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate('user');

  if (!order) {
    return next(new AppError('Order not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: order,
    },
  });
});

// @desc calculate shipping rate
// @route POST api/v1/order/shipping-rate
// @access PUBLIC
const createShippingRate = catchAsync(async (req, res, next) => {
  const { zipDest, weightLb, weightOz } = req.body;

  const zipOrigin = '72753';
  const container = '';
  const service = 'Priority';

  const xmlRoot = xmlbuilder2
    .create({ version: '1.0' })
    .ele('RateV4Request', { USERID: process.env.USPS_ID })
    .ele('Package', { ID: '0' })
    .ele('Service')
    .txt(`${service}`)
    .up()
    .ele('ZipOrigination')
    .txt(`${zipOrigin}`)
    .up()
    .ele('ZipDestination')
    .txt(`${zipDest}`)
    .up()
    .ele('Pounds')
    .txt(`${weightLb}`)
    .up()
    .ele('Ounces')
    .txt(`${weightOz}`)
    .up()
    .ele('Container')
    .txt(`${container}`)
    .up()
    .up()
    .up();

  const xmlData = xmlRoot.end({ prettyPrint: true });
  const url =
    `https://secure.shippingapis.com/ShippingAPI.dll?API=RateV4&XML=` +
    encodeURIComponent(xmlData);

  const response = await axios.get(url);

  // converting to JSON object
  const data = xmlbuilder2.convert(response.data, { format: 'object' });

  if (data.RateV4Response.Package.Error) {
    return next(new AppError('Shipping Rate Error', 404));
  }

  // access postage cost
  const rate = data.RateV4Response.Package.Postage.Rate;

  res.status(200).json({
    status: 'success',
    data: {
      rate,
    },
  });
});

export {
  getUserOrders,
  getOneOrder,
  getUserOrder,
  getAllOrders,
  createShippingRate,
};
