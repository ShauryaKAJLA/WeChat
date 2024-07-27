import React, { useEffect, useState } from 'react'
import Message from './Message'
import axios from 'axios';

const Messages = ({prop:chat}) => {
  const [currentUser,setCurrentUser]=useState(null)
  useEffect(()=>{
    (async ()=>{
        const response=await  axios.get(`${import.meta.env.VITE_API_URL}/api/users/getCurrentUser`,{withCredentials:true})
        console.log(response.data.data)
        setCurrentUser(response.data.data)
    })();
  },[])
  return (
    <div className='px-4 flex-1 overflow-auto'>
      {chat?.map(item=>(
        <Message key={item._id} prop={{item,currentUser}}/>
      ))}
    </div>
  )
}

export default Messages
