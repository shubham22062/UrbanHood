import mongoose, { Document,mongo,Schema } from "mongoose";

interface ICartItem {
    product:mongoose.Types.ObjectId;
    quantity:number;
    size:string;
    color:string;
}

export interface ICart extends Document{
    user:mongoose.Types.ObjectId;
    items:ICartItem[];
}

const cartSchema = new Schema<ICart>({

    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    items:[
        {
            product:{
                type:Schema.Types.ObjectId,
                ref:"Product",
                required:true,
            
            },
            quantity:{
                type:Number,
                required:true,
                default:1,
            },
            size:{
                type:String,
            },
            color:{
                type:String,
            },
        },
    ],
},{timestamps:true})

export const Cart = mongoose.model<ICart>("Cart" , cartSchema);

