'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.orderValidationSchema = void 0;
const zod_1 = require('zod');
exports.orderValidationSchema = zod_1.z.object({
  email: zod_1.z.string().email('Invalid email format'),
  productId: zod_1.z.string().length(24, 'Invalid product ID'),
  quantity: zod_1.z
    .number()
    .int()
    .positive('Quantity must be a positive integer'),
  price: zod_1.z.number().positive('Price must be a positive number'),
});
