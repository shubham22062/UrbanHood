import type{ Response } from "express";
import type{ AuthRequest } from "../middleware/auth.middleware.js";
import { Address } from "../model/address.model.js";


export const addAddress = async(req:AuthRequest, res:Response)=>{
    try {
        const {name ,phone ,city, state,country,pincode,addressLine} = req.body;
        
        let isDefault = false;
        

        const existing = await Address.findOne({user:req.user!.id});

        if(!existing){
            isDefault=true;
        }

        const address = await Address.create({
            user:req.user!.id,
            name,
            phone,
            addressLine,
            city,
            state,
            country,
            pincode,
            isDefault,
        })

        res.status(200).json({
            sucess:true,
            address,
        })
    } catch (error:any) {
        res.status(500).json({message:error.message});
    }
}

export const getAddress = async(req:AuthRequest, res:Response)=>{
    try {
        const addresses = await Address.find({user:req.user!.id});

        res.json({
            sucess:true,
            addresses,
        })
    } catch (error:any) {
        res.status(500).json({message:error.message})
    }
}

export const updateAddress = async(req:AuthRequest, res:Response)=>{
    try {
        const address = await Address.findById(req.params.id);

        if(!address){
            return res.status(404).json({message:"Adderss Not found"});
        }

        if(address.user.toString()!==req.user.id){
            return res.status(403).json({message:"Unauthorized"});
        }

        Object.assign(address,req.body);

        await address.save();

        res.json({
            sucess:true,
            address,
        })

    } catch (error:any) {
        res.status(500).json({message:error.message})
    }
}

export const deleteAddress = async (req:AuthRequest, res:Response)=>{
    try {
        const address = await Address.findById(req.params.id);

        if(!address){
            return res.status(404).json({message:"Adderss not found"})
        }

        if(address.user.toString()!==req.user.id){
            return res.status(404).json({message:"Unauthorized"})

        }

        await address.deleteOne();

        res.json({
            success:true,
            message:"Address Deleted",
        })
    } catch (error:any) {
        res.status(500).json({message:error.message})
    }
}

export const setDefaultAddress = async(req:AuthRequest, res:Response)=>{
   try {
     const address = await Address.findById(req.params.id);

     if(!address){
        return res.status(404).json({message:"Address not found"});

     }

     await Address.updateMany(
        {user:req.user!.id},
        {isDefault:false}
     );

     address.isDefault= true;

     await address.save();

     res.json({
        sucess:true,
        address,
     })
 
   } catch (error:any) {
      res.status(500).json({message:error.message})
   }

}

