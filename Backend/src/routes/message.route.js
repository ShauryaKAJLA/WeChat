import { Router } from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router=Router()

router.use(verifyJWT)

router.route('/send/:id').post(sendMessage)
router.route('/getMessages/:id').post(getMessages)

export default router