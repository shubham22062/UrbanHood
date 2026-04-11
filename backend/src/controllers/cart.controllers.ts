import type{Response } from "express";
import { Cart } from "../model/cart.model.js";
import type{ AuthRequest } from "../types/authrequest.js";

export const addToCart = async(req:AuthRequest, res:Response)=>{
    try {
        const {product , quantity, size, color} = req.body;

        const userId = req.user!.id;

        let cart = await Cart.findOne({user:userId})

        

    } catch (error) {
        
    }
}