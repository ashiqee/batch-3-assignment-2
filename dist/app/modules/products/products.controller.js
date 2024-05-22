"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsControllers = void 0;
const products_service_1 = require("./products.service");
const productValidation_1 = require("./productValidation");
const zod_1 = require("zod");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = req.body;
        //validation create product
        const parsedProduct = productValidation_1.productValidationSchema.parse(product);
        const result = yield products_service_1.ProductsServices.createProductsIntoDB(parsedProduct);
        res.status(200).json({
            success: true,
            message: "Product created successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "can't not Product created!",
            error: err,
        });
    }
});
//get all products with search
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = req.query;
        const result = yield products_service_1.ProductsServices.getAllProductsFromDB(searchTerm);
        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: `${searchTerm} Product not found`,
            });
        }
        res.status(200).json({
            success: true,
            message: `Product ${searchTerm ? "searched" : "fetched"} successfully`,
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Could not fetch All Products!",
            error: err,
        });
    }
});
//get single Product
const getSignleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield products_service_1.ProductsServices.getSignleProductFromDB(productId);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Product fetched successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Could not fetch Product!",
            error: err,
        });
    }
});
//update product
const updateAProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const product = req.body;
        const updateProductData = {
            _id: productId,
            data: product,
        };
        const result = yield products_service_1.ProductsServices.updateAProductIntoDB(updateProductData);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: result,
        });
    }
    catch (err) {
        if (err instanceof zod_1.z.ZodError) {
            const errorMsg = err.errors.map((error) => ({
                path: error.path.join('.'),
                errorMessage: error.message,
            }));
            return res.status(400).json({
                success: false,
                message: "Validation error",
                errors: errorMsg,
            });
        }
        else {
            return res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    }
});
// delete product 
const deleteAProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield products_service_1.ProductsServices.deleteAProductFromDB(productId);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            data: null,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to delete product",
            data: err.message,
        });
    }
});
exports.ProductsControllers = {
    createProduct,
    getAllProducts,
    getSignleProduct,
    updateAProduct,
    deleteAProduct,
};
