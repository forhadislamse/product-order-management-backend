import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDb = async (product: TProduct) => {
  const result = await Product.create(product);
  return result;
};

const getAllProductsFromDb = async (filter: object) => {
  const result = await Product.find(filter);
  return result;
};

const getProductByIdFromDb = async (id: string) => {
  // if (!Types.ObjectId.isValid(id)) {
  //   // Validate ObjectId format
  //   throw new Error('Invalid Product ID format');
  // }
  const result = await Product.findById({ _id: id });
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

  return result;
};

const deleteProductByIdFromDb = async (id: string) => {
  const result = await Product.deleteOne({ _id: id });
  return result;
};

export const ProductServices = {
  createProductIntoDb,
  getAllProductsFromDb,
  getProductByIdFromDb,
  updateProductByIdIntoDb,
  deleteProductByIdFromDb,
};
