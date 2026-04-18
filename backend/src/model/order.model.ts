import mongoose, { Document,Schema } from "mongoose";

interface IOrderItem{
    product:mongoose.Types.ObjectId;
    quantity:number;
    size:string;
    color:string;
}

interface IShippingAddress{
    name:string;
    phone:string;
    addressLine:string;
    city:string;
    state:string;
    pincode:string;
    country:string;
}

export interface IOrder extends Document{
    user:mongoose.Types.ObjectId;
    items:IOrderItem[];
    totalPrice:number;
    shippingAddress:IShippingAddress;
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
        name:String,
        phone:String,
        addressLine:String,
        city:String,
        state:String,
        pincode:String,
        country:String,
    },
    paymentStatus:{
        type:String,
        enum:["pending", "paid"],
        default:"pending",
    },
    orderStatus:{
        type:String,
        enum:["processing", "shipped", "delivered"],
        default:"processing",
    },
},{timestamps:true})

export const Order = mongoose.model<IOrder>("Order",orderSchema);