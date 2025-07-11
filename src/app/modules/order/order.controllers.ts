import { Request, Response } from 'express';
import { OrderServices } from './order.services';
import orderValidationSchema from './order.zodValidation';
import { Product } from '../product/product.model';

const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, productId, quantity, price } = req.body;
    const orderData = { email, productId, quantity, price };
    // console.log(orderData);
    const zodParsedData = orderValidationSchema.parse(orderData);

    // Check if the product exists in the inventory
    const product = await Product.findById(productId);
    // console.log(product);
    if (!product) {
      res.status(404).json({ success: false, message: 'Product not found.' });
      return;
    }
    // Check if the requested quantity is available in stock
    if (product.inventory.quantity < quantity) {
      res.status(400).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      });
      return;
    }
    // Reduce the quantity in inventory and update stock status
    product.inventory.quantity -= quantity;

    // If inventory reaches 0, update `inStock` to `false`
    product.inventory.inStock = product.inventory.quantity > 0;

    // Save the updated product inventory
    await product.save();

    const result = await OrderServices.createOrderIntoDb(zodParsedData);
    if (!result) {
      res.status(404).json({
        success: false,
        message: 'Order not created',
      });
    }
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
      //   console.log(searchEmail, email);
      filter.email = searchEmail;
      //   console.log(filter.email);
    }
    const result = await OrderServices.getAllOrdersFromDb(filter);
    // Dynamically modify message based on the searchTerm and results
    if (email) {
      message =
        result.length > 0
          ? `Orders fetched successfully for user email '${email}'`
          : `No Order found matching search term '${email}'`;
    }
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

const getOrderById = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const result = await OrderServices.getOrderByIdFromDb(orderId);
    if (!result) {
      res.status(404).json({
        success: false,
        message: 'Order not found',
        data: null,
      });
    }
    res.status(200).json({
      success: true,
      message: 'specific Order fetched successfully!',
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
  getOrderById,
};
