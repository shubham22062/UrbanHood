import type{Response } from "express";
import { Cart } from "../model/cart.model.js";
import type{ AuthRequest } from "../types/authrequest.js";

export const addToCart = async(req:AuthRequest, res:Response)=>{
    try {
        const {productId , quantity, size, color} = req.body;

        const userId = req.user!.id;

        let cart = await Cart.findOne({user:userId})

        if(!cart){
            cart = await Cart.create({
                user:req.user!.id,
                items:[{product:productId,quantity, size,color }]
            });
        }else{
            const itemIndex = cart.items.findIndex(
                (item)=>{
                    item.product.toString()===productId&&
                    item.size===size && 
                    item.color===color
                }
            );

            if(itemIndex>-1){
                cart.items[itemIndex]!.quantity+=quantity;

            }else{
                cart.items.push({product:productId,quantity,size,color});
            }
            await cart.save();
        }

        res.json({
            sucess:true,
            cart,
        })
        

    } catch (error:any) {
        res.status(500).json({message: error.message})
    }
}

export const getCart = async(req:AuthRequest, res:Response)=>{
    try {
        const cart = await Cart.findOne({user:req.user!.id}).populate("items.product");
        res.json({
            sucess:true,
            cart,
        });
    } catch (error:any) {
        res.status(500).json({message:error.message});
    }
}

export const updateCart = async(req:AuthRequest, res:Response)=>{
    try {
       const{productId, quantity} = req.body;
       const cart = await Cart.findOne({user:req.user!.id})

       if(!cart){
        return res.status(404).json({message:"Cart not found"});

       }

       const item = cart.items.find(
        (item)=>item.product.toString() ===productId
       );

       if(!item){
        return res.status(404).json({message:"Item not found"});

       }

       item.quantity = quantity;

       await cart.save();

       res.json({
        sucess:true,
        cart,
       })
    } catch (error:any) {
        res.status(500).json({message:error.message});
    }
}

export const removeCartItem = async(req:AuthRequest, res:Response)=>{
    try {
       const {productId} = req.params;
       
       const cart = await Cart.findOne({user:req.user!.id});

       if(!cart){
        return res.status(404).json({message:"Cart not found"});
       }

       cart.items = cart.items.filter(
        (item)=>item.product.toString()!==productId
       );

       await cart.save()

       res.json({
        sucess:true,
        cart,
       })
    } catch (error:any) {
        res.status(500).json({message:error.message})
    }
};