import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getProductsController,
  getProductByIdController,
  addProductController,
  updateProductByIdController,
  deleteProductByIdController
} from '../controllers/products.js';

const productsRouter = Router();

productsRouter.get('/', ctrlWrapper(getProductsController));
productsRouter.get('/:productId', ctrlWrapper(getProductByIdController));
productsRouter.post('/', ctrlWrapper(addProductController));
productsRouter.patch('/:productId', ctrlWrapper(updateProductByIdController));
productsRouter.delete('/:productId', ctrlWrapper(deleteProductByIdController));

export default productsRouter;
