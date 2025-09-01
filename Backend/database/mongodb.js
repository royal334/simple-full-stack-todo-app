import mongoose from "mongoose";
import { MONGODB_URL } from "../config/env.js";

if(!MONGODB_URL){
     throw new Error("MONGODB_URL is not defined in environment variables");
}

export const connectDB = async () => {
     try{
          await mongoose.connect(MONGODB_URL)
          console.log("Connected to database")

     }
     catch(err){
          console.error("Failed to connect to database", err)
          process.exit(1)
     }
}