import React from 'react'
import { useSelector } from 'react-redux'

const Message = ({prop:{item:chat,currentUser}}) =>{
  const selectedUser=useSelector(state=>state.chat.receiver)
  return (
    <div className={`chat ${chat?.senderId==selectedUser?._id?"chat-start":"chat-end"}`}>
        <div className='chat-image avatar'>
            <div className='w-10 rounded-full'>
                <img src={chat?.senderId==selectedUser?._id?selectedUser.profilePic:currentUser?.profilePic} alt="Tailwind CSS chat bubble component" />
            </div>
        </div>
        <div className={`chat-bubble text-white bg-blue-500`}>{chat.message}</div>
        <div className={`chat-footer opacity-50 text-xs flex gap-1 items-center`}>{new Date(chat.createdAt).toLocaleString('en-GB', {day:'numeric', month: 'long', year:'numeric'}) }</div>
    </div>
  )
}

export default Message
