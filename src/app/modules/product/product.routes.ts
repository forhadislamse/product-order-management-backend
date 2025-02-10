import express from 'express';
import { ProductControllers } from './product.controllers';

const router = express.Router();

router.post('/', ProductControllers.createProduct);
router.get('/', ProductControllers.getAllProducts);
router.get('/:productId', ProductControllers.getProductById);

export const ProductRoutes = router;
