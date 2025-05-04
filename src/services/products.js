import { ProductModel } from '../db/models/Product.js';

export const getProducts = async (filter = {}) => {
  let productsQuery = ProductModel.find();
  if (filter.userId) {
    productsQuery = productsQuery.where('userId').equals(filter.userId);
  }
  if (filter.maxPrice) {
    productsQuery = productsQuery.where('price').lte(filter.maxPrice);
  }
  if (filter.minPrice) {
    productsQuery = productsQuery.where('price').gte(filter.minPrice);
  }
  if (filter.category) {
    productsQuery = productsQuery.where('category').equals(filter.category);
  }
  return productsQuery;
};

export const getProductById = async (id, userId) => {
  return await ProductModel.findOne({ _id: id, userId });
};

export const addProduct = async (payload) => {
  return await ProductModel.create(payload);
};

export const updateProductById = async (id, payload, userId, options = {}) => {
  const data = await ProductModel.findOneAndUpdate(
    { _id: id, userId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );
  if (!data || !data.value) {
    return null;
  }
  return data.value;
};

export const deleteProductById = async (id, userId) => {
  return await ProductModel.findOneAndDelete({ _id: id, userId });
};
