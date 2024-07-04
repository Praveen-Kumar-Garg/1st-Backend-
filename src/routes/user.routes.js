//make router

import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const router = Router()
 router.route("/register").post(registerUser)
 //router.route("/login").post(registerUser)
//after users from appjs all message pages here

export default router