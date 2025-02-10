import { z } from 'zod';

// Define Zod schemas
const variantValidationSchema = z.object({
  type: z.string().min(1, 'Type is required'),
  value: z.string().min(1, 'Value is required'),
});

const inventoryValidationSchema = z.object({
  quantity: z.number().int().min(0, 'Quantity must be a non-negative integer'),
  inStock: z.boolean(),
});

const productValidationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().min(0, 'Price must be a positive number'),
  category: z.string().min(1, 'Category is required'),
  tags: z.array(z.string().min(1)).nonempty('Tags must have at least one item'),
  variants: z
    .array(variantValidationSchema)
    .nonempty('At least one variant is required'),
  inventory: inventoryValidationSchema,
});
export default productValidationSchema;
