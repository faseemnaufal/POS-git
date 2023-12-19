// models/Bill.js
const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  billNumber: String,
  totalAmount: Number,
  subTotal: Number,
  discount: Number,
  date: Date,
  cart: [
    {
      id: String,
      name: String,
      price: Number,
      quantity: Number,
      totalAmount: Number,
    }
  ],
});

const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;
