import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';

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

export { getUserOrders, getOneOrder, getUserOrder, getAllOrders };
