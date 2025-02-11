import { Request, Response } from 'express';
import { OrderServices } from './order.services';
import orderValidationSchema from './order.zodValidation';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    // console.log(orderData);
    const zodParsedData = orderValidationSchema.parse(orderData);
    const result = await OrderServices.createOrderIntoDb(zodParsedData);
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (error: unknown) {
    const err = error as Error;
    // console.log(err.message);
    res.status(400).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;

    // console.log(email);
    // const filter:any = {};
    const filter: Record<string, unknown> = {}; //for filter any
    let message = 'Orders fetched successfully!'; // Default message
    if (email) {
      const searchEmail = email.toString().trim(); // Ensure it's a string
      console.log(searchEmail, email);
      filter.email = searchEmail;
      console.log(filter.email);
    }
    const result = await OrderServices.getAllOrdersFromDb(filter);
    // Dynamically modify message based on the searchTerm and results
    message =
      email && result.length > 0
        ? `Orders fetched successfully for user email '${email}'`
        : `No Order found matching search term '${email}'`;

    res.status(200).json({
      success: true,
      message,
      data: result,
    });
  } catch (error: unknown) {
    const err = error as Error;
    res.status(400).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};
export const OrderControllers = {
  createOrder,
  getAllOrders,
};
