import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import Order from '../models/orderModel.js';

// @desc create an order
// @route POST api/v1/order
// @access public
const placeOrder = catchAsync(async (req, res, next) => {
  const { shippingAddress, billingAddress, isBillingSameAsAddress } =
    req.body.orderState;
  const { subtotal, tax, orderTotal, shippingCost, cartItems, shippingType } =
    req.body;

  const itemsFormatted = cartItems.map((product) => {
    return {
      name: product.name,
      quantity: product.quantity,
      size: product.size,
      price: product.price,
    };
  });

  const orderDetails = {
    user: req.user._id,

    items: itemsFormatted,
    shippingAddress: {
      customerPhoneNumber: shippingAddress.phoneNumber,
      name: shippingAddress.name,
      address: shippingAddress.address,
      city: shippingAddress.city,
      postalCode: shippingAddress.zipCode,
      state: shippingAddress.state,
      addressSecond: shippingAddress.secondAddress
        ? shippingAddress.secondAddress
        : null,
    },
    billingAddress: isBillingSameAsAddress
      ? {
          billingPhoneNumber: shippingAddress.phoneNumber,
          name: shippingAddress.name,
          address: shippingAddress.address,
          city: shippingAddress.city,
          postalCode: shippingAddress.zipCode,
          state: shippingAddress.state,
          addressSecond: shippingAddress.secondAddress
            ? shippingAddress.secondAddress
            : null,
        }
      : {
          name: billingAddress.billingName,
          billingPhoneNumber: billingAddress.billingPhoneNumber,

          address: billingAddress.billingAddress,
          city: billingAddress.billingCity,
          postalCode: billingAddress.billingZipCode,
          state: billingAddress.billingState,
          addressSecond: billingAddress.billingSecondAddress
            ? billingAddress.billingSecondAddress
            : null,
        },
    itemsPrice: subtotal,
    taxPrice: tax,
    total: orderTotal,
    shippingOption: {
      option: shippingType,
      cost: shippingCost,
    },
  };

  const order = await Order.create(orderDetails);

  if (!order) {
    return next(new AppError("Couldn't process order", 400));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: order,
    },
  });
});

export { placeOrder };
