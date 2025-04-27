import createHttpError from 'http-errors';
import {
  getProducts,
  getProductById,
  addProduct,
  updateProductById,
  deleteProductById
} from '../services/products.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';


export const getProductsController = async (req, res) => {
  const filter = parseFilterParams(req.query);
  
  const products = await getProducts(filter);

  res.json({
    status: 200,
    message: 'Successfully found products!',
    data: products,
  });
};

export const getProductByIdController = async (req, res) => {
  const { productId } = req.params;

  const product = await getProductById(productId);

  if (!product) {
    throw createHttpError(404, 'Product not found');
  }

  res.json({
    status: 200,
    message: `Successfully found product with id ${productId}!`,
    data: product,
  });
};

export const addProductController = async (req, res) => {
  const data = await addProduct(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a product!',
    data,
  });
};

export const updateProductByIdController = async(req,res) => {
  const { productId } = req.params;
  const updateProduct = await updateProductById(productId, req.body);

  if (!updateProduct) {
    throw createHttpError(404, 'Product not found');
  }

  res.json({
    status: 200,
    message: `Successfully patched a product!`,
    data: updateProduct,
  });
};

export const deleteProductByIdController = async(req, res) => {
  const { productId } = req.params;

  const deleteProduct = await deleteProductById(productId);

  if (!deleteProduct) {
    throw createHttpError(404, 'Product not found');
  }

  res.status(204).send();
};