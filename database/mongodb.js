import mongoose from "mongoose";
import { DB_URI,NODE_ENV } from "../config/env.js";


if (!DB_URI) {
    throw new Error("NO Database connection string Provided")
}


export async function connectToDatabase(){
    try {
        await mongoose.connect(DB_URI);
        console.log(`Connected to Database in ${NODE_ENV} Mode`)
    } catch (error) {
        console.error("error connecting to database,", error);
        process.exit();
    }
}