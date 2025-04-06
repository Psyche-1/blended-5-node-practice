import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getProductsController,
  getProductByIdController,
  addProductController,
  updateProductByIdController
} from '../controllers/products.js';

const productsRouter = Router();

productsRouter.get('/', ctrlWrapper(getProductsController));
productsRouter.get('/:productId', ctrlWrapper(getProductByIdController));
productsRouter.post('/', ctrlWrapper(addProductController));
productsRouter.patch('/:productId', ctrlWrapper(updateProductByIdController));

export default productsRouter;
