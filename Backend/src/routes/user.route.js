import { Router }  from "express";
import { 
    loginUser, 
    registerUser
} from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()

router.route("/register").post(
    upload.single("profilePic"),
    registerUser
    )

router.route("/login").post(loginUser)

export default router