const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
      {
        artwork: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Artwork',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    status: {
      type: String,
      enum: ['pending', 'shipped', 'delivered'],
      default: 'pending',
    },
    shippingAddress: {
      type: {
        name: {
          type: String,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        state: {
          type: String,
          required: true,
        },
        country: {
          type: String,
          required: true,
        },
        postalCode: {
          type: String,
          required: true,
        },
      },
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ['creditCard', 'paypal', 'cashOnDelivery'],
      required: true,
    },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
