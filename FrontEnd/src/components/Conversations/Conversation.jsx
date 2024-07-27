import React, { useContext, useEffect } from 'react'
import { SocketContext } from '../Context/SocketContext'

const Conversation = ({prop:{item,selectedUser}}) => {
    const {onlineUsers}=useContext(SocketContext)
    useEffect(()=>{
        console.log(item)
    },[])
  return (
    <>
        <div className={`flex gap-2 items-center ${item?._id==selectedUser?._id?"bg-sky-500":"hover:bg-sky-500"} rounded p-2 py-1 cursor-pointer `}>
            <div className={`avatar ${onlineUsers.some(i=>i==item._id)?'online':'offline'}`}>
                <div className='w-12 rounded-full'>
                    <img src={item.profilePic} alt="user avatar" />
                </div>
            </div>
            <div className='flex flex-col flex-1'>
                <div className='flex gap-3 justify-between'>
                    <p className='font-bold text-gray-200'>{item.fullname}</p>
                    <span className='text-xl'>🎃</span>
                </div>
            </div>
        </div> 
        <div className='divider my-0 py-0 h-1'></div>
    </>
  )
}

export default Conversation
