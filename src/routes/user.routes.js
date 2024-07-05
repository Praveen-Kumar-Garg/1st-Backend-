//make router

import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
//import upload
import { upload } from "../middlewares/multer.middleware.js"

const router = Router()
router.route("/register").post(
    //middleware  added between
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ])
    , registerUser)
//router.route("/login").post(registerUser)
//after users from appjs all message pages here

export default router