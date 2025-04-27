import { ProductModel } from '../db/Product.js';

export const getProducts = async (filter = {}) => {
  let productsQuery =  ProductModel.find();
  if (filter.maxPrice) {
    productsQuery = productsQuery.where("price").lte(filter.maxPrice);
  }
  if (filter.minPrice) {
    productsQuery = productsQuery.where("price").gte(filter.minPrice);
  }
  if (filter.category) {
    productsQuery = productsQuery.where("category").equals(filter.category);
  }
  return productsQuery;
};

export const getProductById = async (id) => {
  return await ProductModel.findById(id);
};

export const addProduct = async (payload) => {
  return await ProductModel.create(payload);
};

export const updateProductById = async (id, payload, options = {}) => {
    console.log(id);
    
    const data = await ProductModel.findByIdAndUpdate({_id:id}, payload, {
        new: true,
        includeResultMetadata: true,
        ...options
    });
    if (!data || !data.value) {
        return null;
    }
    return data.value;
    
  };

  export const deleteProductById = async(id) => {
    return await ProductModel.findByIdAndDelete({_id:id});
  };