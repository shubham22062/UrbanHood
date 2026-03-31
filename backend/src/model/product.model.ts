import mongoose, { Document, Schema } from "mongoose";


export interface IProduct extends Document{
    name:string;
    description:string;
    price :number;
    category:"Men"| "Women" |"kids";
    brand?:string;
    sizes:string[];
    colors:string[];
    images:string[];
    stock:number;
    rating:number;
    numReviews:number;
    createdAt:Date;
    updatedAt:string;
}

const productSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        enum:["Men", "Women", "kids"],
        required:true,
    },
    brand:{
        type:String,
    },
    sizes:[{
        type:String,
        enum:["s","m","l","xl"],
    }],

    colors:[String],
    images:[String],
    stock:{
        type:Number,
        required:true,
        default:0,
    },
    numReviews:{
        type:Number,
        default:0,
    },
},{timestamps:true})


export const Product= mongoose.model<IProduct>("Product", productSchema);