import type{ Response } from "express";
import { Order } from "../model/order.model.js";
import { Cart } from "../model/cart.model.js";
import type{ AuthRequest } from "../types/authrequest.js";
import { Address } from "../model/address.model.js";


export const placeOrder = async(req:AuthRequest, res:Response)=>{
    try {
        const {addressId} = req.body;
        const address = await Address.findById(addressId);

        if(!address){
            return res.status(404).json({message:"address not found!!"})
        }
        const cart = await Cart.findOne({user:req.user!.id}).populate("items.product")

        if(!cart || cart.items.length===0){
            return res.status(404).json({message:"Cart is empty!!"});

        }
        const totalPrice = cart.items.reduce((acc:number, item:any)=>{
            return acc+item.product.price*item.quantity;
        },0);

        const order = await Order.create({
            user:req.user!.id,
            items:cart.items,
            totalPrice,
            shippingAddress:{
                name:address.name,
                phone:address.phone,
                addressLine:address.addressLine,
                city:address.city,
                state:address.state,
                pincode:address.pincode,
                country:address.country,
            }
        });

        cart.items=[];
        await cart.save();

        res.status(201).json({
            sucess:true,
            order,
        })

    } catch (error:any) {
        res.status(500).json({message:error.message})
    }
}

export const getMyOrder = async(req:AuthRequest,res:Response)=>{
    try {
        const orders = await Order.findOne({user:req.user!.id}).populate("items.product");
        res.json({
            success:true,
            orders,
        })
    } catch (error:any) {
        res.status(500).json({message:error.message})
    }
}

export const getAllOrders = async(req:AuthRequest, res:Response)=>{
    try {
        const orders = await Order.find().populate("user").populate("items.product")

        res.json({
            sucess:true,
            orders,
        })
    } catch (error:any) {
        res.status(500).json({message:error.message

        })
    }
}


export const updateOrderStatus = async(req:AuthRequest, res:Response)=>{
    try {
        const {status} = req.body;
    
        const order = await Order.findById(req.params.id);
    
        if(!order){
            return res.status(404).json({message:"Order not found"});
    
        }
        order.orderStatus=status;
        await order.save();
    
        res.json({
            sucess:true,
            order,
        })
    } catch (error:any) {
        res.status(500).json({message:error.message})
    }
}