import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

export const connectDB = async():Promise<void>=>{
    try {
        const DB = process.env.DATABASE_URI as string;
        if(!DB){
            throw new Error("Database_uri is not defined");
        };
        mongoose.connect(DB)
        console.log("Database is connected sucessfully");

    } catch (error) {
        console.error("Database connection failed", error)
        process.exit(1);

}
};