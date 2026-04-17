import mongoose, { Document, Schema } from "mongoose";

export interface IAddress extends Document{
    user:mongoose.Types.ObjectId;
    name:string;
    phone:string;
    addressLine:string;
    city:string;
    state:string;
    pincode:string;
    country:string;
    isDefault:boolean;
}

const addressSchema = new Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    addressLine:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,

    },
    state:{
        type:String,
        required:true,
    },
    pincode:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true,
    },
    isDefault:{
        type:Boolean,
        default:false,
    },
},{timestamps:true})

export const Address = mongoose.model<IAddress>("Address",addressSchema);