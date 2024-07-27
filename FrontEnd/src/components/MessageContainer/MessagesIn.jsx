import axios from 'axios';
import React, { useState } from 'react'
import { BsSend } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { addChat } from '../Conversations/chatSlice';
const MessagesIn = () => {
  const [message,setMessage]=useState("");
  const dispatch=useDispatch()
  const selectedUser=useSelector(state=>state.chat.receiver)

  const handleSendMessage=async (event)=>{
    event.preventDefault()
    if(message.trim()!="")
    {
        try {
          console.log(selectedUser)
          const response=await axios.post(`${import.meta.env.VITE_API_URL}/api/messages/send/${selectedUser?._id}`,{message},{withCredentials:true})
          console.log(response.data.data)
          dispatch(addChat(response.data.data))
          setMessage("")
        } catch (error) {
          console.log(error.response)
        }
    }
  }
  return (
    <form className='flex relative'>
        <input type="text" value={message} onChange={(e)=>setMessage(e.target.value)} className='input w-[100%] ' placeholder='Send a Message...'/>
        <button className='btn btn-primary btn-circle btn-sm absolute top-2 right-1'><BsSend onClick={(e)=>handleSendMessage(e)}/></button>
    </form>
  )
}

export default MessagesIn
