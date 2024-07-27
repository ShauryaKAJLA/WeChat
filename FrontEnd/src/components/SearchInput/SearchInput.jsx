import React, { useEffect, useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { Search } from './search';
const SearchInput = () => {
  const [search,setSearch]=useState("");
  const dispatch=useDispatch()
  const handleSearch=(e)=>{
    setSearch(e.target.value)
  } 
  useEffect(()=>{
    dispatch(Search(search))
  },[search])
  return (
   <form className='flex items-center gap-2'>
        <input type="text" placeholder='Search...' value={search} onChange={(e)=>handleSearch(e)} className='input input-bordered  rounded-full' />
        <button className='btn btn-circle bg-sky-500 text-white flex justify-center items-center'>
        <IoSearchSharp className='w-6 h-6 outline-none'/>
        </button>
   </form>
  )
}

export default SearchInput
