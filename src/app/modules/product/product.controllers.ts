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
    const { searchTerm } = req.query;
    // const {price } = req.query;

    // console.log(searchTerm, price);
    // let filter: any = {};
    let filter: Record<string, unknown> = {}; //for filter any
    let message = 'Products fetched successfully!'; // Default message
    if (searchTerm) {
      const searchString = searchTerm.toString().trim(); // Ensure it's a string
      // const regex = new RegExp(`^${searchString}$`, 'i'); //for exact match regExp object
      const regex = new RegExp(searchString, 'i'); //for partial match regExp object
      const numValue = Number(searchString);
      const boolValue =
        searchString.toLowerCase() === 'true'
          ? true
          : searchString.toLowerCase() === 'false'
            ? false
            : null;
      filter = {
        // any of the or can work and save it for further update
        $or: [
          { name: regex },
          { description: { $regex: regex } },
          { category: { $regex: regex } },
          { tags: { $regex: regex } },
          { 'variants.type': { $regex: regex } }, // Search in variants type
          { 'variants.value': { $regex: regex } }, //  Search in variants value
          { 'inventory.quantity': !isNaN(numValue) ? numValue : undefined }, //Match exact quantity (if valid number)
          { 'inventory.inStock': boolValue !== null ? boolValue : undefined }, // Match `true` or `false`
        ],

        /* $or: [
          { name: regex }, // Exact match for name
          { description: regex }, // Exact match for description
          { category: regex }, // Exact match for category
          { tags: { $in: [regex] } }, //  Match if `tags` array contains the search term
          { 'variants.type': regex }, //  Exact match in `variants.type`
          { 'variants.value': regex }, //  Exact match in `variants.value`
          { 'inventory.quantity': !isNaN(numValue) ? numValue : undefined }, //Match exact quantity (if valid number)
          { 'inventory.inStock': boolValue !== null ? boolValue : undefined }, // Match `true` or `false`
        ], */
      };
    }
    /* if (price) {
      const priceValue = Number(price);
      if (!isNaN(priceValue)) {
        filter.price = priceValue; // Exact match for price
      }
    } */
    const result = await ProductServices.getAllProductsFromDb(filter);
    // Dynamically modify message based on the searchTerm and results
    if (searchTerm && result.length > 0) {
      message = `Products matching search term '${searchTerm}' fetched successfully!`;
    } else if (searchTerm && result.length === 0) {
      message = `No products found matching search term '${searchTerm}'.`;
    }
    /*  if (price && result.length > 0) {
      message = `Products matching search term '${price}' fetched successfully!`;
    } else {
      message = `No products found matching search term '${price}'.`;
    } */
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
