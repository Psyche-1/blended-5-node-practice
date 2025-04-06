import { ProductModel } from '../db/Product.js';

export const getProducts = async () => {
  return await ProductModel.find();
};

export const getProductById = async (id) => {
  return await ProductModel.findById(id);
};

export const addProduct = async (payload) => {
  return await ProductModel.create(payload);
};
