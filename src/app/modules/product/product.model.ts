import { model, Schema } from 'mongoose';
import { TInventory, TProduct, TVariant } from './product.interface';

// Define Schema
const variantSchema = new Schema<TVariant>(
  {
    type: { type: String, required: true },
    value: { type: String, required: true },
  },
  //{ _id: false } //This removes _id from variants
);

const inventorySchema = new Schema<TInventory>({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});

const productSchema = new Schema<TProduct>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    tags: { type: [String], required: true },
    variants: { type: [variantSchema], required: true },
    inventory: { type: inventorySchema, required: true },
  },
  { versionKey: false },
);

// Create Model
export const Product = model<TProduct>('Product', productSchema);
