import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {Bounce,toast} from 'react-toastify'
const Signup = () => {
    const [username,setUsername]=useState("")
    const [fullname,setFullname]=useState("")
    const [password,setPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")
    const [gender,setGender]=useState("")
    const [file,setFile]=useState(null)
    const [Error,setError]=useState("")
    const handleSignup=async (event)=>{
        event.preventDefault()
        if(username.trim()=="")
        {
            setError("Username is required")
        }
        else if(fullname.trim()=="")
        {
            setError("Fullname is required")
        }
        else if(password.trim()=="")
        {
            setError("Password is required")
        }
        else if(confirmPassword.trim()=="")
        {
            setError("Confirm Password is required")
        }
        else if(gender.trim()=="")
        {
            setError("Gender is required")
        }
        else if(password.trim()!==confirmPassword.trim())
        {
            setError("Password doesnot match with confirmed password")
        }
        else if(!file)
        {
            setError("File is required")
        }
        else
        {
              console.log({username,fullname,password,confirmPassword,gender,file})      
              console.log(import.meta.env.VITE_API_URL)
              try {
                const formData=new FormData()
                formData.append("username",username)
                formData.append("fullname",fullname)
                formData.append("password",password)
                formData.append("confirmPassword",confirmPassword)
                formData.append("gender",gender)
                formData.append("profilePic",file)
                console.log(formData)
                const response=await axios.post(`${import.meta.env.VITE_API_URL}/api/users/register`,formData)
                console.log(response)
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
                    Signup
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
                        <span className='text-base label-text'>Fullname</span>
                    </label>
                    <input type="text" value={fullname} onChange={(e)=>{setFullname(e.target.value)}} placeholder="Enter Fullname" className="input input-bordered w-full h-10" />
                </div>
                
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Password</span>
                    </label>
                    <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Enter Password" className="input input-bordered w-full h-10" />
                </div>

                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Confirm Password</span>
                    </label>
                    <input type="password" value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}} placeholder="Confirm password" className="input input-bordered w-full h-10" />
                </div>
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Proile Picture</span>
                    </label>
                    <input type="file" onChange={(e) => {  setFile(e.target.files[0]); }} placeholder="Confirm password" className="file-input input-bordered w-full h-10" />
                </div>

                <div className='flex'>
                    <div className='form-control'>
                        <label className='label gap-2 cursor-pointer'>
                            <span className='label-text'>Male</span>
                            <input type="checkbox" checked={`${gender==="Male"?"checked":""}`} value="Male" onChange={(e)=>{setGender(e.target.value)}} className='checkbox border-slate-900' />
                        </label>
                    </div>
                    <div className='form-control'>
                        <label className='label gap-2 cursor-pointer'>
                            <span className='label-text'>Female</span>
                            <input type="checkbox" checked={`${gender==="Female"?"checked":""}`} value="Female" onChange={(e)=>{setGender(e.target.value)}} className='checkbox border-slate-900' />
                        </label>
                    </div>
                </div>
                <div>
                    <span className='text-sm font-semibold label-text text-red-400'>{Error}</span>
                </div>
                <div>
                <Link to="/Login" className='text-xs hover:underline hover:text-blue-600 mt-2 inline-block'>Already have an account?</Link>
                </div>
                <div className='flex justify-center'>
                    <button className="btn btn-sm mt-2 w-32 h-10" onClick={(e)=>handleSignup(e)}>Signup</button>
                </div>
            </form>
          </div>
        </div>
      )
}

export default Signup
