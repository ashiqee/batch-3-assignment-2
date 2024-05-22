'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.OrdersModel = void 0;
const mongoose_1 = require('mongoose');
const mongoose_2 = require('mongoose');
const orderSchema = new mongoose_1.Schema({
  email: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});
exports.OrdersModel = (0, mongoose_2.model)('Orders', orderSchema);
