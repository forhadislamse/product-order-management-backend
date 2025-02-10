import { Types } from 'mongoose';
import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDb = async (product: TProduct) => {
  const result = await Product.create(product);
  return result;
};

const getAllProductsFromDb = async () => {
  const result = await Product.find();
  return result;
};

const getProductByIdFromDb = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) {
    // Validate ObjectId format
    throw new Error('Invalid Product ID format');
  }
  const result = await Product.findById(id);
  return result;
};

const updateProductByIdIntoDb = async (
  id: string,
  updates: Partial<TProduct>,
) => {
  const result = await Product.findOneAndUpdate({ _id: id }, updates, {
    new: true,
    runValidators: true,
    // arrayFilters: [{ 'elem.value': 'Green' }], //for array of object we need positional operator
  });
  if (!result) {
    throw new Error('Product not found or update failed');
  }
  return result;
};
export const ProductServices = {
  createProductIntoDb,
  getAllProductsFromDb,
  getProductByIdFromDb,
  updateProductByIdIntoDb,
};
