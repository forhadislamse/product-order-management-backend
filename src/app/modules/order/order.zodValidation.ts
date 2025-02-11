import { z } from 'zod';

const orderValidationSchema = z.object({
  email: z.string().email('Invalid email format'),
  productId: z.string().length(24, 'Invalid product ID'), // MongoDB ObjectId length
  price: z.number().min(0, 'Price must be a positive number'),
  quantity: z.number().int().min(1, 'Quantity must be at least 1'),
});

export default orderValidationSchema;
