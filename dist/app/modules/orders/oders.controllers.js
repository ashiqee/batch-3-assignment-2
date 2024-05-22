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
exports.OrdersControllers = void 0;
const orders_service_1 = require("./orders.service");
const products_service_1 = require("../products/products.service");
const orderValidation_1 = require("./orderValidation");
const zod_1 = require("zod");
const createNewOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = req.body;
        //    order validation 
        const parseOrderValid = orderValidation_1.orderValidationSchema.parse(order);
        const { productId, quantity } = parseOrderValid;
        const productInventoryUpdate = yield products_service_1.ProductsServices.orderInventoryUpdateInDB(productId, quantity);
        if (!productInventoryUpdate) {
            return res.status(500).json({
                success: false,
                message: "Insufficient quantity available in inventory",
            });
        }
        const result = yield orders_service_1.OrdersServices.createNewOrderInDB(parseOrderValid);
        res.status(200).json({
            success: true,
            message: "Order created successfully",
            data: result
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
                message: "Could not create new order!",
                error: err.message
            });
        }
    }
});
// 3. Retrive all Orders 
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.query;
        const result = yield orders_service_1.OrdersServices.getAllOrdersFromDB(email);
        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            data: result
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Could not fetch Orders!",
            error: err.message
        });
    }
});
exports.OrdersControllers = {
    createNewOrder,
    getAllOrders
};
