import { z } from 'zod';

export const variantValidationSchema = z.object({
  type: z.string().min(1, 'Variant type is required'),
  value: z.string().min(1, 'Variant Value is required'),
});

export const inventoryValidationSchema = z.object({
  quantity: z.number().int().min(0, 'Quantity must be a non-negative integer'),
  inStock: z.boolean(),
});

export const productValidationSchema = z.object({
  name: z.string().min(1, { message: 'Product name is required' }),
  description: z
    .string()
    .min(1, { message: 'Product description is required' }),
  price: z.number().positive({ message: 'Price must be a positive number' }),
  category: z.string().min(1, { message: 'Product category is required' }),
  tags: z.array(z.string().min(1, { message: 'Tag cannot be empty' })),
  variants: z.array(variantValidationSchema),
  inventory: inventoryValidationSchema,
});
