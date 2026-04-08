import mongoose, { Document,mongo,Schema } from "mongoose";

interface ICartItem {
    product:mongoose.Types.ObjectId;
    quantity:number;
    size:string;
    color:string;
}

export interface ICart extends Document{
    
}