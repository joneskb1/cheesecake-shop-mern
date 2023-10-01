import catchAsync from '../utils/catchAsync.js';
import User from '../models/userModel.js';
import Order from '../models/orderModel.js';
import Stripe from 'stripe';
import sendMail from '../utils/email.js';

const handleOrder = catchAsync(async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE_TEST_KEY);

  // const endpointSecret = process.env.STRIPE_DEV_HOOK_KEY;
  const endpointSecret = process.env.STRIPE_PROD_HOOK_KEY;

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

    let { cartItems, user } = event.data.object.metadata;

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
        city: event.data.object.shipping_details.address.city,
        name: event.data.object.shipping_details.name,
        address: event.data.object.shipping_details.address.line1,
        postalCode: event.data.object.shipping_details.address.postal_code,
        state: event.data.object.shipping_details.address.state,
        addressSecond: event.data.object.shipping_details.address.line2,
      },
      itemsPrice: event.data.object.amount_subtotal / 100,
      taxPrice: event.data.object.total_details.amount_tax / 100,
      total: event.data.object.amount_total / 100,
      shippingOption: {
        option: 'Priority',
        cost: event.data.object.shipping_cost.amount_subtotal / 100,
      },
      paymentResult: {
        id: event.data.object.id,
      },
    };

    const order = await Order.create(orderDetails);

    const currentUser = await User.findById(user);

    currentUser.orders.push(order);
    currentUser.save({ validateBeforeSave: false });

    //send email
    const html = `<p>${currentUser.name} order confirmed!  </p>`;
    await sendMail(currentUser.email, html, 'Order Placed!');
  }

  res.json({ received: true });
});

const createCheckoutSession = catchAsync(async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE_TEST_KEY);

  const order = req.body.cart.map((item) => {
    return {
      quantity: item.quantity,
      price_data: {
        currency: 'usd',
        unit_amount: Number.parseFloat(item.price, 10) * 100,
        product_data: {
          name: `${item.name}`,
        },
      },
    };
  });

  const session = await stripe.checkout.sessions.create({
    metadata: req.body.metadata,
    payment_method_types: ['card'],
    mode: 'payment',
    // success_url: `http://localhost:5173/my-account?success=true`,
    // cancel_url: `http://localhost:5173/cart`,
    success_url: `https://take-the-cake.onrender.com/my-account?success=true`,
    cancel_url: `https://take-the-cake.onrender.com/cart`,
    client_reference_id: req.body.metadata.user,
    line_items: order,
    automatic_tax: {
      enabled: true,
    },
    shipping_address_collection: {
      allowed_countries: ['US'],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: Math.trunc(req.body.metadata.shipRate * 100),
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
