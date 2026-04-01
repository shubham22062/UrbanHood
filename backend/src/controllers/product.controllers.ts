import type{ Request , Response } from "express";

import { Product } from "../model/product.model.js";

// for adminOnly .
export const createProduct = async(req:Request, res:Response)=>{
    try {
        const product = await Product.create(req.body);

        res.status(201).json({
            success:true,
            product,
        })
    } catch (error:any) {
        res.status(500).json({message: error.message})
    }
}

//get All products ..

export const getProducts = async(req:Request, res:Response)=>{
   try {
     const products = await Product.find();
 
     res.json({
         success:true,
         count:products.length,
         products,
     })
   } catch (error:any) {
     res.status(500).json({message:error.message})
   }
}

// Get single product ..

export const getProductById = async(req:Request, res: Response)=>{
    try {
        const product =await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({message:"Product is not found"});
        }

        res.json({
            success:true,
            product,
        });
    } catch (error:any) {
        res.status(500).json({message:error.message});
    }
};

//upadate products(admin)..

export const updateProduct = async(req:Request, res:Response)=>{
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
    
        if(!product){
            return res.status(404).json({message:"Product is not found"});
    
        }
    
    
        res.json({
            success:true,
            product,
    
        });
    } catch (error:any) {
        res.status(500).json({message:error.message})
    }
}

//Delete the product (onlyadmin);

export const deleteProduct = async(req:Request, res:Response)=>{
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
    
        if(!product){
            return res.status(404).json({message:"Product not fount"})
        }
        res.json({
            sucess:true,
            message:"Product deleted",
        });
        
    } catch (error:any) {
        res.status(500).json({message:error.message})
    }
}