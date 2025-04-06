import { ProductModel } from "../db/Product.js";

export const getProducts = async() => {
    return await ProductModel.find();
};

export const getProductById = async(id) =>{
    console.log(id);
    
    const data = await ProductModel.findById(id);
    console.log(data);
    return data;
};