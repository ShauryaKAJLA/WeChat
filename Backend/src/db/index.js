import mongoose from 'mongoose'
import { DB_NAME } from '../constants.js'

const connectDb=async ()=>{
    try {
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log("Mongo db connection successfull "+connectionInstance.connection.host)
    } catch (error) {
        console.log("Mongo db connection failed")
        process.exit()
    }

}
export default connectDb