import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { getProductsController, getProductByIdController } from "../controllers/products.js";

const productsRouter = Router();

productsRouter.get('/', ctrlWrapper(getProductsController));
productsRouter.get('/:productId', ctrlWrapper(getProductByIdController));

export default productsRouter;