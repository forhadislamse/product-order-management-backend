import { model, Schema } from 'mongoose';
import { TOrder } from './order.interface';

const orderSchema = new Schema<TOrder>(
  {
    email: { type: String, required: true, trim: true, lowercase: true },
    productId: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  { versionKey: false },
);
//way 2: product exist and inventory update operation
//we can use pre hook here for product exist and inventory update here

export const Order = model<TOrder>('Order', orderSchema);
