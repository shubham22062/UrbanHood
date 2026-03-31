import type { Request, Response } from "express";
import { User } from "../model/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utlis/jwt.js";

export const Register = async(req:Request, res:Response)=>{
   try {
     const {name , email , password, phone} = req.body;
 
     const userExists = await User.findOne({email});
 
     if(userExists){
         return res.status(401).json({message:"User is already exists"});
     }
 
     const hashedPassword = await bcrypt.hash(password,10);
 
     const user = await User.create({
         name,
         email,
         password:hashedPassword,
         phone
     });
 
    res.status(201).json({
     sucess:true,
     user:{
         id:user._id,
         name :user.name,
         email:user.email,
         role:user.role
     },
     token: generateToken(user._id.toString(), user.role)
    })
   } catch (error) {
     res.status(500).json({message:"server Error", error})
   }


}

export const Login = async(req:Request, res:Response)=>{
    try {
        const {email, password} = req.body;

        const user= await User.findOne({email});

        if(!user){
            return res.status(401).json({message : "invalid Credentials"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(408).json({message:"invalid credentials"})
        }

        res.status(201).json({
            sucess:true,
            user:{
                id:user._id,
                email:user.email,
                name:user.name,
                role:user.role
                

            },
            token:generateToken(user._id.toString(),user.role)

        })

    } catch (error) {
        res.status(500).json({message:"server Errro", error})
    }
}
