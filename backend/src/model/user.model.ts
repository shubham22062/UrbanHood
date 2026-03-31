import mongoose, {Document,mongo,Schema} from "mongoose";


export interface IAddress{
    street:string;
    city:string;
    state:string;
    pincode :string;
    country:string;
}

export interface IUser extends Document{
    name :string;
    email:string;
    password:string;
    Avatar?:string;
    phone?:string;
    role:"user"|"admin";
    addresses:IAddress[];
    createdAt:Date;
    updatedAt:Date;
}

const AddressSchema = new Schema<IAddress>({
    street:String,
    city:String,
    state:String,
    pincode:String,
    country:{
        type:String,
        default:"India",
    },
},{timestamps:true})

const userSchema = new Schema<IUser>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
   },
   Avatar:String,
   phone:String,
   role:{
    type:String,
    enum:["user","admin"],
    default:"user"
   },
   addresses:[AddressSchema],

    
},{timestamps:true})

export const User = mongoose.model("User", userSchema)