import mongoose from "mongoose";
import color from "colors";
export const Dbconnection = async()=>{
    try {
        await mongoose.connect(process.env.mongodburl)
        console.log("Database connected successfully".bgGreen.black);
    } catch (error) {
        console.log(`Database connection failed ${error}`.bgRed.white)
    }
}