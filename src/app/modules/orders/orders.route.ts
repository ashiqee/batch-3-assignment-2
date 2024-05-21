import express from "express";
import { OrdersControllers } from './oders.controllers';


const router = express.Router();



router.post('/', OrdersControllers.createNewOrder);
router.get('/', OrdersControllers.getAllOrders);



export const OrdersRoutes = router;