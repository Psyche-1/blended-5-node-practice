import createHttpError from 'http-errors';
import {
  getProducts,
  getProductById,
  addProduct,
} from '../services/products.js';

export const getProductsController = async (req, res) => {
  const products = await getProducts();

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
