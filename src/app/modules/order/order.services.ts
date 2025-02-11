import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDb = async (order: TOrder) => {
  const result = await Order.create(order);
  return result;
};
const getAllOrdersFromDb = async (filter: object) => {
  const result = await Order.find(filter);
  return result;
};

export const OrderServices = {
  createOrderIntoDb,
  getAllOrdersFromDb,
};
