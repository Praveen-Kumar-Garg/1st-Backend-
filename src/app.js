import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
//cookie parser is use for performing operation on user cookies from server

const app = express()

//using cors for cross origin resource sharing
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

//data will come from differnt places
app.use(express.json({limit: "16kb"}))
//for file we can use multer
app.use(express.urlencoded({extended: true, limit:
    "16kb"
}))
//public assets for accesing
app.use(express.static("public"))
app.use(cookie.cookieParser())
//checking between response and req is called middleware.(middleware next is flag) 
export { app }