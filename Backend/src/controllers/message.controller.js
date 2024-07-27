import {Message} from '../models/message.model.js'
import {Conversation} from '../models/conversation.model.js'
import { asyncHandler } from "../utils/asyncHandler.util.js";
import apiError from "../utils/apiError.util.js";
import apiResponse from '../utils/apiResponse.util.js';
import { getReceiverSocketId, io } from '../socket/socket.js';

const sendMessage=asyncHandler(async (req,res)=>{
    const {message}=req.body
    const senderId=req.user._id
    const {id:receiverId}=req.params

    if(!message)
    {
        return res.status(400).json(new apiError(400,"Message is required"))
    }
    let conversation=await Conversation.findOne({
        participants: { $all:[senderId,receiverId] }
    })

    if(!conversation)
    {
        conversation=await Conversation.create({
            participants:[senderId,receiverId]
        })
        if(!conversation)
        {
            return res.status(500).json(new apiError(500,"There was a problem while starting the conversation"))
        }
    }
    
    const newMessage=await Message.create({
        senderId,receiverId,message
    })

    if(!newMessage)
    {
        return res.status(500).json(new apiError(500,"There was a problem while sending the message"))
    }

    conversation.messages.push(newMessage._id)
    await conversation.save()
    const receiverSocket=getReceiverSocketId(receiverId)
    if(receiverId)
    io.to(receiverSocket).emit("newMessage",newMessage)
    return res.status(200).json(new apiResponse(200,newMessage,"Message was sent successfully"))
})

const getMessages=asyncHandler(async (req,res)=>{
    const senderId=req.user._id
    const {id:receiverId}=req.params

    const conversation=await Conversation.findOne({
        participants:{$all:[senderId,receiverId]}
    }).populate("messages")

    if(!conversation)
    {
        return res.status(200).json(new apiResponse(200,[],"No message were found"))
    }

    return res.status(200).json(new apiResponse(200,conversation.messages,"Message returned successfully"))
})



export {sendMessage,getMessages}