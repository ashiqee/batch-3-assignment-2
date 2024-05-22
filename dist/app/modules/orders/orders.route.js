"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersRoutes = void 0;
const express_1 = __importDefault(require("express"));
const oders_controllers_1 = require("./oders.controllers");
const router = express_1.default.Router();
router.post('/', oders_controllers_1.OrdersControllers.createNewOrder);
router.get('/', oders_controllers_1.OrdersControllers.getAllOrders);
exports.OrdersRoutes = router;
