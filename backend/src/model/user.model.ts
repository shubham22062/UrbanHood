import mongoose, {Document,mongo,Schema} from "mongoose";


export interface IAddress{
    street:String;
    city:String;
    state:String;
    pincode :String;
    country:string;
}

export interface IUser extends Document{
    name :String;
    email:String;
    password:String;
    Avatar?:String;
    phone?:String;
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