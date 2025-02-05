import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    items: [
      {
        name: {
          type: String,
          required: [true, 'Product name required'],
        },
        quantity: {
          type: Number,
          required: [true, 'Quantity required'],
        },
        size: {
          type: Number,
          required: [true, 'Product size required'],
        },
        price: {
          type: String,
          required: [true, 'Product price required'],
        },
      },
    ],

    shippingAddress: {
      name: String,

      address: {
        type: String,
        required: [true, 'Customer shipping address required'],
      },
      addressSecond: {
        type: String,
      },
      city: {
        type: String,
        required: [true, 'Customer shipping address city required'],
      },
      postalCode: {
        type: String,
        required: [true, 'Customer shipping address postal code required'],
      },
      state: {
        type: String,
        required: [true, 'Customer shipping address state required'],
      },
    },
    itemsPrice: {
      type: Number,
      required: [true, 'Items price required'],
      default: 0.0,
    },
    taxPrice: {
      type: Number,
      required: [true, 'Tax price required'],
      default: 0.0,
    },
    shippingOption: {
      option: {
        type: String,
        required: [true, 'Shipping option required'],
      },
      cost: {
        type: Number,
        required: [true, 'Shipping price required'],
      },
    },
    total: {
      type: Number,
      required: [true, 'Order total required'],
    },
    paymentResult: {
      id: String,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
