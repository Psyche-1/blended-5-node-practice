import { ProductModel } from "../db/Product.js";

export const getProducts = async() => {
    return await ProductModel.find();
};