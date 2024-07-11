import { app } from "./app.js";
import connectDb from "./db/index.js";
import dotenv from 'dotenv'

connectDb().then(()=>{
    console.log("Db Connected")
})
.catch(()=>{
    console.log("Db failed")
})

dotenv.config({path:"./.env"})

app.listen(process.env.PORT,()=>{
    console.log("Server is listening at port "+process.env.PORT)
})