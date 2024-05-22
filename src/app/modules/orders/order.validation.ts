import { z } from 'zod';

export const orderValidationSchema = z.object({
  email: z.string().email('Invalid email format'),
  productId: z.string().length(24, 'Invalid product ID'),
  quantity: z.number().int().positive('Quantity must be a positive integer'),
  price: z.number().positive('Price must be a positive number'),
});
