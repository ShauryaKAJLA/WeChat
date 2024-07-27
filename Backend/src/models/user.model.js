import mongoose from 'mongoose'
import bcrypt from 'bcrypt' 
import jwt from 'jsonwebtoken'
const userSchema=new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:[6,"Minimum length of password is 6"]
    },
    profilePic:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true,
    }
},{
    timestamps:true
})


userSchema.pre("save",async function(next){
    if(this.isModified("password"))
    {
        this.password=await bcrypt.hash(this.password,10)
    }
    next();
})
userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}
userSchema.methods.generateAccessToken=function()
{
    return jwt.sign({
        _id:this._id,
        username:this.username
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
)
}

const User=mongoose.model("User",userSchema)

export default User