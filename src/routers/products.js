import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getProductsController,
  getProductByIdController,
  addProductController,
  updateProductByIdController,
  deleteProductByIdController,
} from '../controllers/products.js';
import { validateBody } from '../utils/validateBody.js';
import { addProductSchema, editProductSchema } from '../validation/product.js';
import { isValidId } from '../middlewares/isValidId.js';

const productsRouter = Router();

productsRouter.get('/', ctrlWrapper(getProductsController));
productsRouter.get(
  '/:productId',
  isValidId,
  ctrlWrapper(getProductByIdController),
);
productsRouter.post(
  '/',
  validateBody(addProductSchema),
  ctrlWrapper(addProductController),
);
productsRouter.patch(
  '/:productId',
  isValidId,
  validateBody(editProductSchema),
  ctrlWrapper(updateProductByIdController),
);
productsRouter.delete(
  '/:productId',
  isValidId,
  ctrlWrapper(deleteProductByIdController),
);

export default productsRouter;
