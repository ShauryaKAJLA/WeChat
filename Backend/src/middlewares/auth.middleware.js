import jwt from 'jsonwebtoken'
import { asyncHandler } from '../utils/asyncHandler.util.js'
import apiError from '../utils/apiError.util.js'



export const verifyJWT=asyncHandler(async (req,res,next)=>{
   try {
     const token=req.cookies?.accessToken || req.header("Authorization").replace("Bearer ","")
     if(!token)
     {
         return res.status(400).json(new apiError(400,"Token is required"))
     }
 
     const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
 
     if(!decodedToken)
     {
         return res.status(400).json(new apiError(400,"Unauthorized access"))
     }
 
     const user=await User.findById(decodedToken?._id).select()
 
     if(!user)
     {
         return res.status(400).json(new apiError(400,"Unauthorized access"))
     }
     req.user=user
     next()
   } catch (error) {
    return res.status(400).json(new apiError(400,"There was a problem while verifing the token",error))
   }
})