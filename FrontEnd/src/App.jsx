import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
function App() {
  return (
    <div className='p-4 h-screen flex items-center justify-center '>
      <Outlet />
    </div>
  )
}

export default App
