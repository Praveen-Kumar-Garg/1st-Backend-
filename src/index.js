//require('dotenv').config9({path:'./env'})

//import mongoose from "mongoose";
import dotenv from "dotenv"

//database se jab bhi bat karo try catch lagao and async await

//we can also import database by Immediately execute function
//we can add semicolon while starting iiffe
//import { DB_NAME } from "./constants";

import connectDB from "./db/index.js";

//this is due to the dotenv
dotenv.config({
    path: './env'
})
//promises return
connectDB()
.then(()=> {
    app.listen(process.env.PORT||8000, () => {
        console.log(`server is running at port: ${process.env.PORT} `);
    })
})
.catch((err) => {
    console.log("MONGO db connect failed!!!", err);

})
//1st approach
/*
import express from "express"

const app = express()

    (async () => {
        try {
            await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
            //we can add listener (express)
            app.on("error", (error) => {
                console.log("ERRR:", error);
                throw error
            })
            app.listen(process.env.PORT , ()=>{
                console.log(`app is listening on port ${process.env.PORT}`);
            })
        } catch (error) {
            console.error("ERROR:", error)
            throw error
        }
    })()
        */