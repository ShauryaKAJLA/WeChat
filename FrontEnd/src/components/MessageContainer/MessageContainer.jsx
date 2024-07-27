import React, { useEffect, useState } from 'react'
import Messages from './Messages'
import MessagesIn from './MessagesIn'
import { TiMessages } from "react-icons/ti";
import { useSelector } from 'react-redux';
const MessageContainer = () => {
  const {receiver:selectedUser,chat}=useSelector(state=>state.chat)
  const [selected,setSelected]=useState(false);
  useEffect(()=>{
    if(selectedUser)
    {
      setSelected(true)
    }
    else
    {
      setSelected(false)
    }
  },[selectedUser])
  return (
    <div className='w-[450px] max-w-[500px] flex flex-col'>
      {selected?<>
        {/* Header*/}
        <div className='bg-slate-500 px-4 py-2 mb-2'>
            <span className='label-text'>To:</span> <span className='text-gray-900 font-bold'>{selectedUser?.fullname}</span>
        </div>
        <Messages prop={chat}/>
        <MessagesIn />
      </>:<NoChatSelected/>}
      
    </div>
  )
}

const NoChatSelected=()=>{
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
        <p>Welcome 👋 John Doe ❄️</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className='text-3xl md:text-6xl text-center'/>
      </div>
    </div>
  )
}
export default MessageContainer
