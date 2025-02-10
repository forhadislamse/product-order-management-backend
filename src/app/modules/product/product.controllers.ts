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
    if (!result) {
      res.status(404).json({
        success: false,
        message: 'Product not found',
        data: null,
      });
    }
    res.status(200).json({
      success: true,
      message: 'specific Product fetched successfully!',
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

const updateProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    // console.log(req.params.productId);
    const updates = req.body;
    // console.log(updates);
    const result = await ProductServices.updateProductByIdIntoDb(
      productId,
      updates,
    );
    if (!result) {
      res.status(404).json({
        success: false,
        message: 'Product not found for Update',
        data: null,
      });
    }
    // console.log(result);
    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
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

const deleteProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteProductByIdFromDb(productId);
    if (result.deletedCount === 0) {
      res.status(404).json({
        success: false,
        message: 'Product not found for delete!',
        data: null,
      });
    }
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: (error as Error).message || 'Something went wrong',
      error: error,
    });
  }
};
export const ProductControllers = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
