import mongoose, { Document,Schema } from "mongoose";

interface IOrderItem{
    product:mongoose.Types.ObjectId;
    quantity:number;
    size:string;
    color:string;
}

export interface IOrder extends Document{
    user:mongoose.Types.ObjectId;
    items:IOrderItem[];
    totalPrice:number;
    shippingAddress:string;
    paymentStatus:string;
    orderStatus:string;
}

const orderSchema = new Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true,
    },
    items:[
        {
            product:{
            type:mongoose.Types.ObjectId,
            ref:"Product",
        },
        quantity:Number,
        size:String,
        color:String,
    },
    ],
    totalPrice:{
        type:Number,
        required:true,
    },
    shippingAddress:{
        type:String,
        required:true,
    },
    paymentStatus:{
        type:String,
        enum:["pending", "paid"],
        default:"pending",
    },
    orderStatus:{
        type:String,
        enum:["processing", "shipped", "deliverd"],
        default:"processing",
    },
},{timestamps:true})

export const Order = mongoose.model<IOrder>("Order",orderSchema);