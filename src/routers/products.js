import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { getProductsController } from "../controllers/products.js";

const productsRouter = Router();

productsRouter.get('/', ctrlWrapper(getProductsController));

export default productsRouter;