"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidationSchema = exports.inventoryValidationSchema = exports.variantValidationSchema = void 0;
const zod_1 = require("zod");
exports.variantValidationSchema = zod_1.z.object({
    type: zod_1.z.string().min(1, "Variant type is required"),
    value: zod_1.z.string().min(1, "Variant Value is required"),
});
exports.inventoryValidationSchema = zod_1.z.object({
    quantity: zod_1.z.number().int().min(0, "Quantity must be a non-negative integer"),
    inStock: zod_1.z.boolean(),
});
exports.productValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: "Product name is required" }),
    description: zod_1.z.string().min(1, { message: "Product description is required" }),
    price: zod_1.z.number().positive({ message: "Price must be a positive number" }),
    category: zod_1.z.string().min(1, { message: "Product category is required" }),
    tags: zod_1.z.array(zod_1.z.string().min(1, { message: "Tag cannot be empty" })),
    variants: zod_1.z.array(exports.variantValidationSchema),
    inventory: exports.inventoryValidationSchema,
});
