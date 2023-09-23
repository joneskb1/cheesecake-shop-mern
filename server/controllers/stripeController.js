import catchAsync from '../utils/catchAsync.js';
import User from '../models/userModel.js';
import Order from '../models/orderModel.js';
import Stripe from 'stripe';

import { calcShippingRate } from '../utils/calcShipping.js';

const stripe = new Stripe(
  'sk_test_51NrWHSAIpneYbxMTWzYUvm5ewLDpvDIdSDQ2a6YFknY3LBzKiy0t195WgYMEE2Ob8WpGE1ipa4dgzuY4ww7Yc3ET00XDNPFYJQ'
);

const handleOrder = catchAsync(async (req, res, next) => {
  const endpointSecret =
    'whsec_47c24fcaf3f206f76eb25b453b01af15f5f9ac79a39454b485963c7a9ba29b25';
  const sig = req.headers['stripe-signature'];

  let event = req.body;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.log('error', err);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  if (event.type === 'checkout.session.completed') {
    // createOrder
    let { orderState, cartItems, subtotal, tax, orderTotal, user } =
      event.data.object.metadata;

    const { shippingAddress, billingAddress, isBillingSameAsAddress } =
      JSON.parse(orderState);

    cartItems = JSON.parse(cartItems);

    const itemsFormatted = cartItems.map((product) => {
      return {
        name: product.name,
        quantity: product.quantity,
        size: product.size,
        price: product.price,
      };
    });

    const orderDetails = {
      user,

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
        option: 'Priority',
        cost: event.data.object.shipping_cost.amount_total / 100,
      },
    };

    const order = await Order.create(orderDetails);

    const currentUser = await User.findById(user);

    currentUser.orders.push(order);
    currentUser.save({ validateBeforeSave: false });
  }

  res.json({ received: true });
});

const createCheckoutSession = catchAsync(async (req, res, next) => {
  const orderState = JSON.parse(req.body.metadata.orderState);
  const zipCode = orderState.shippingAddress.zipCode;
  let totalOz = 0;

  function calcSingleCakeWeightOz(size) {
    return Number.parseInt(size, 10) * 12;
  }

  const order = req.body.cart.map((item) => {
    const oz = calcSingleCakeWeightOz(item.size);
    totalOz += oz * item.quantity;

    return {
      quantity: item.quantity,
      price_data: {
        currency: 'usd',
        unit_amount: Number.parseInt(item.price, 10) * 100,
        product_data: {
          name: `${item.name}`,
        },
      },
    };
  });

  const lbs = totalOz / 16;
  const remainingOz = totalOz % 16;

  const rate = await calcShippingRate('72753', zipCode, lbs, remainingOz);
  console.log(rate);

  const session = await stripe.checkout.sessions.create({
    metadata: req.body.metadata,
    payment_method_types: ['card'],
    mode: 'payment',
    success_url: `http://localhost:5173/my-account?success=true`,
    cancel_url: `http://localhost:5173/checkout`,
    client_reference_id: req.body.metadata.user,
    line_items: order,
    shipping_address_collection: {
      allowed_countries: ['US'],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: Math.trunc(rate * 100),
            currency: 'usd',
          },
          display_name: 'Priority',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 5,
            },
            maximum: {
              unit: 'business_day',
              value: 7,
            },
          },
        },
      },
    ],
  });

  res.status(200).json({
    status: 'success',
    session,
  });
});

export { handleOrder, createCheckoutSession };
