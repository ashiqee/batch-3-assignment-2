import { Schema } from 'mongoose';
import { TOders } from './orders.interface';
import { model } from 'mongoose';

const orderSchema = new Schema<TOders>({
  email: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

export const OrdersModel = model<TOders>('Orders', orderSchema);
