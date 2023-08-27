import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    customerPhoneNumber: Number,
    orderId: {
      type: Number,
      required: [true, 'Order ID required'],
    },
    date: {
      type: Date,
      required: [true, 'Order date required'],
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
          type: Number,
          required: [true, 'Product price required'],
        },
      },
    ],

    shippingAddress: {
      address: {
        type: String,
        required: [true, 'Customer shipping address required'],
      },
      city: {
        type: String,
        required: [true, 'Customer shipping address city required'],
      },
      postalCode: {
        type: String,
        required: [true, 'Customer shipping address postal code required'],
      },
      country: {
        type: String,
        required: [true, 'Customer shipping address country required'],
      },
    },
    billingAddress: {
      address: {
        type: String,
        required: [true, 'Customer billing address required'],
      },
      city: {
        type: String,
        required: [true, 'Customer billing address city required'],
      },
      postalCode: {
        type: String,
        required: [true, 'Customer billing address postal code required'],
      },
      country: {
        type: String,
        required: [true, 'Customer billing address country required'],
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
    paymentMethod: {
      type: String,
      required: [true, 'Payment method required'],
    },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },
    isPaid: {
      type: Boolean,
      required: [true, 'isPaid field required'],
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: [true, 'isDelivered field required'],
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
    tracking: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
