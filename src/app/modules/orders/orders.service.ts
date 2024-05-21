
import { TOders } from './orders.interface';
import { OrdersModel } from './orders.model';



const createNewOrderInDB = async (order: TOders) => {

     const result = await OrdersModel.create(order);
    return result;
}


const getAllOrdersFromDB = async (email: string)=>{

    const query = email ? {email:email} : {};
    
    const result = await OrdersModel.find(query);
    return result;
}


export const OrdersServices={
    createNewOrderInDB,
    getAllOrdersFromDB
}