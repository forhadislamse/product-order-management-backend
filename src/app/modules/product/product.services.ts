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
    throw new Error('Invalid Movie ID format');
  }
  const result = await Product.findById(id);
  return result;
};
export const ProductServices = {
  createProductIntoDb,
  getAllProductsFromDb,
  getProductByIdFromDb,
};
