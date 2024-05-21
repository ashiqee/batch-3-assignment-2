
import { Request, Response } from "express";
import { OrdersServices } from './orders.service';
import { ProductsServices } from "../products/products.service";

const createNewOrder = async (req: Request, res: Response) => {
    try {
        const order = req.body; 
        const {productId ,quantity}=order;
        
        const productInventoryUpdate = await ProductsServices.orderInventoryUpdateInDB(productId as string, quantity as number)


if(!productInventoryUpdate){
    return res.status(500).json({
        success: false,
        message: "Insufficient quantity available in inventory",
           })}

        const result = await OrdersServices.createNewOrderInDB(order);
        res.status(200).json({
            success: true,
            message: "Order created successfully",
            data: result
    })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: "Could not create new order!",
            error: err.message
        })}

}

// 3. Retrive all Orders 

const getAllOrders = async (req: Request, res: Response) => {
    try {
        const {email} = req.query

        const result = await OrdersServices.getAllOrdersFromDB(email as string);
       
        if(result.length === 0){
            return res.status(404).json({
              success: false,
              message: "Order not found",
            });
          }
       
        res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            data: result
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: "Could not fetch Orders!",
            error: err.message
        })}
}





export const OrdersControllers = {
    createNewOrder,
    getAllOrders
};