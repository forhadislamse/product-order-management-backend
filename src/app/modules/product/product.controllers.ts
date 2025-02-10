import { Request, Response } from 'express';
import productValidationSchema from './product.zodValidation';
import { ProductServices } from './product.services';

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;

    // console.log(productData);
    const zodParsedData = productValidationSchema.parse(productData);
    const result = await ProductServices.createProductIntoDb(zodParsedData);
    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
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

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProductsFromDb();
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
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

const getProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getProductByIdFromDb(productId);
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
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

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getProductById,
};
