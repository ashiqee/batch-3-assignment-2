"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const products_route_1 = require("./app/modules/products/products.route");
const orders_route_1 = require("./app/modules/orders/orders.route");
const CustomeErrors_1 = __importDefault(require("./errors/CustomeErrors"));
const app = (0, express_1.default)();
//parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//application routes
app.use("/api/products", products_route_1.ProductsRoutes);
app.use("/api/orders", orders_route_1.OrdersRoutes);
app.get('/', (req, res) => {
    res.send('Welcome product management api server!');
});
app.all("*", (req, res, next) => {
    next(new CustomeErrors_1.default('Route not found', 404));
});
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});
exports.default = app;
