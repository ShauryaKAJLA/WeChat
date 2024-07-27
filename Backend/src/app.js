import connectDb from "./db/index.js";
import dotenv from 'dotenv'
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { app ,server } from "./socket/socket.js"

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"))
app.use(cookieParser())


//routes import
import userRouter from './routes/user.route.js'
import messageRoute from './routes/message.route.js'
//routes declaration
app.use("/api/users", userRouter)
app.use("/api/messages",messageRoute)

connectDb().then(()=>{
    console.log("Db Connected")
})
.catch(()=>{
    console.log("Db failed")
})

dotenv.config({path:"./.env"})

server.listen(process.env.PORT,()=>{
    console.log("Server is listening at port "+process.env.PORT)
})
export { app }