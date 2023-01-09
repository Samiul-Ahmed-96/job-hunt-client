import React from 'react'
import { Outlet } from 'react-router-dom'
import ChatSidebar from './ChatSidebar'

const Chatbox = () => {
  return (
    <div className='grid grid-cols-12'>
    <ChatSidebar />
    <div className=' col-span-10'>
      <div className=' h-full w-full mx-auto'>
        <Outlet />
      </div>
    </div>
  </div>
  )
}

export default Chatbox