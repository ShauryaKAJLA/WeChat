import { BiLogOut } from "react-icons/bi";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SocketContext } from "../Context/SocketContext";
const Logout = () => {  
  const {setAuthUser}=useContext(SocketContext)
  const navigate=useNavigate()
  const handleLogout=async ()=>{
    try {
      const response=await axios.post(`${import.meta.env.VITE_API_URL}/api/users/logout`,{},{withCredentials:true})
      localStorage.setItem("loggedIn","false")
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
        setAuthUser(null)
        setTimeout(()=>{
            navigate('/Login')
        },2000)
    } catch (error) {
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
  return (
    <div className="mt-auto">
      <BiLogOut className="w-6 h-6 text-white cursor-pointer" onClick={handleLogout}/>
    </div>
  )
}

export default Logout
