import React, { useEffect, useState } from 'react'
import Conversation from './Conversation'
import axios from 'axios'
import {useDispatch,useSelector} from 'react-redux'
import { clearChat, setChat } from './chatSlice'
const Conversations = () => {
  const [allUsers,setAllUsers]=useState([])
  const [sideBar,setSideBar]=useState([])
  const [loading,setLoading]=useState(true)
  const dispatch=useDispatch();
  const search=useSelector(state=>state.search.search)

  useEffect(()=>{
    (async ()=>{
      try {
        const response=await axios.get(`${import.meta.env.VITE_API_URL}/api/users/getAllChats`,{withCredentials:true})
        setSideBar(response.data.data)
        setAllUsers(response.data.data)
        setLoading(false)
      } catch (error) {
        console.log(error.response)
      }
    })();
  },[])
  
  const selectedUser=useSelector(state=>state.chat.receiver)
  const handleGetChat=async (receiver)=>{
    if(selectedUser?._id==receiver._id)
    {
      dispatch(clearChat())
    }
    else{
    try {
      const response=await axios.post(`${import.meta.env.VITE_API_URL}/api/messages/getMessages/${receiver._id}`,{},{withCredentials:true})
      console.log(response)
      dispatch(setChat({receiver,chat:response.data.data}))
    } catch (error) {
      
    }
    } 
  }
  useEffect(()=>{
    console.log(search)
    setSideBar(s=>s=allUsers)
    if(search && search?.trim()!="")
    setSideBar(sideBar.filter(item=>item.fullname.startsWith(search)))
  },[search])

  return (
    <div className=' sm:h-[300px] md:h-[400px] py-2 flex flex-col overflow-auto'>
        {loading?"Loading": <div>
          {sideBar && sideBar.map((item)=>(<div key={item._id} onClick={()=>handleGetChat(item)} >
              <Conversation prop={{item,selectedUser}}  />
          </div>
          ))}
        </div> }
    </div>
  )
}

export default Conversations
