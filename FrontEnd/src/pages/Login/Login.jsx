import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Bounce, toast } from 'react-toastify'
import { SocketContext } from '../../components/Context/SocketContext'

const Login = () => {
    const {setAuthUser}=useContext(SocketContext)
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const [Error,setError]=useState("");
    const navigator=useNavigate();
    const handleLogin=async (event)=>{
        event.preventDefault()
        if(username.trim()=="")
        {
            setError("Username is required")
        }
        else if(password.trim()=="")
        {
            setError("Password is required")
        }
        else
        {
              console.log({username,password})   
              try {
                const response=await axios.post(`${import.meta.env.VITE_API_URL}/api/users/login`,{username,password},{withCredentials:true})
                console.log(response)
                setAuthUser(response.data.data)
                toast.success(response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    });
                    localStorage.setItem("loggedIn","true")
                    navigator('/');
              } catch (error) {
                console.log(error)
                toast.error(error.response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    });
              }
        }
    }

  return (
    <div className='flex flex-col items-center justify-center min-w-80 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 flex flex-col gap-2'>
            <h1 className=' text-3xl font-semibold text-center text-gray-300'>
                Login 
                <span className='text-blue-500'> WeChat</span>
            </h1>
        <form>
            <div>
                <label className='label p-2'>
                    <span className='text-base label-text'>Username</span>
                </label>
                <input type="text" value={username} onChange={(e)=>{setUsername(e.target.value)}} placeholder="Enter Username" className="input input-bordered w-full h-10" />
            </div>
            <div>
                <label className='label p-2'>
                    <span className='text-base label-text'>Password</span>
                </label>
                <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Enter Password" className="input input-bordered w-full h-10" />
            </div>
            <div>
                    <span className='text-sm font-semibold label-text text-red-400'>{Error}</span>
            </div>
            <div>
                <Link to="/Signup" className='text-xs hover:underline hover:text-blue-600 mt-2 inline-block'>{"Don't"} have an account?</Link>
            </div>
            <div className='flex justify-center'>
                    <button className="btn btn-sm mt-2 w-32 h-10" onClick={(e)=>handleLogin(e)}>Login</button>
                </div>
        </form>
      </div>
    </div>
  )
}

export default Login
