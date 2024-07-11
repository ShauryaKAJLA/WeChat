import { asyncHandler } from "../utils/asyncHandler.util.js";
import apiError from "../utils/apiError.util.js";
import apiResponse from "../utils/apiResponse.util.js";
import User from "../models/user.model.js";
import uploadToCloud from "../utils/cloudinary.util.js";

const registerUser=asyncHandler(async (req,res)=>{
    const {fullname,username,password,confirmPassword,gender}=req.body
    if(!fullname || fullname?.trim()=="")
    {
        return res.status(400).json(new apiError(400,"Fullname is required"))
    }
    if(!username || username?.trim()=="")
    {
        return res.status(400).json(new apiError(400,"Username is required"))
    }
    if(!password || password?.trim()=="")
    {
        return res.status(400).json(new apiError(400,"Password is required"))
    }
    if(!confirmPassword || confirmPassword?.trim()=="")
    {
        return res.status(400).json(new apiError(400,"Confirm Password is required"))
    }
    if(!gender || gender?.trim()=="")
    {
        return res.status(400).json(new apiError(400,"Gender is required"))
    }
    if(password!=confirmPassword)
    {
        return res.status(400).json(new apiError(400,"Password doesnot match with the confirmed Password"))
    }
    const existedUser=await User.findOne({username})
    if(existedUser)
    {
        return res.status(400).json(new apiError(400,"User already exists"))
    }
    const localPath=req.file?.path
    if(!localPath)
    {
        return res.status(400).json(new apiError(400,"Profile pic is required"))
    }
    const profilePic=await uploadToCloud(localPath)
    if(!profilePic)
    {
        return res.status(500).json(new apiError(500,"There was a problem while uploading picture to cloud"))
    }
    const newUser=await User.create({fullname,username,password,gender,profilePic:profilePic.url})
    const user=await User.findById(newUser._id)
    if(!user)
    {
        return res.status(500).json(new apiError(500,"There was a problem while registering the user try again later"))
    }
    return res.status(200).json(new apiResponse(200,user,"User was registered successfully"))
})
const loginUser=asyncHandler(async (req, res) => {
    console.log(req.body)
    const {username,password}=req.body
    if(!username || username?.trim()=="")
    {
        return res.status(400).json(new apiError(400,"Username is required"))
    }
    if(!password || password?.trim()=="")
    {
        return res.status(400).json(new apiError(400,"Password is required"))
    }
    const userExists=await User.findOne({username})
    if(!userExists)
    {
        return res.status(400).json(new apiError(400,"No user exists with this username"))
    }
    const checkPassword=await userExists.isPasswordCorrect(password)
    if(!checkPassword)
    {
        return res.status(400).json(new apiError(400,"Password is incorrect try again"))
    }
    const accessToken=userExists.generateAccessToken();
    return res.status(200).cookie("accessToken",accessToken,{httpOnly:true,secure:true,expires:new Date(Date.now()+86400000)}).json(new apiResponse(200,{},"User was successfully logged in!"))
})

export {registerUser,loginUser}