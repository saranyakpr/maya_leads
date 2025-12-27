import React, { useState } from 'react'
import Sidebar from '../Components/Sidebar'
import Header from '../Components/Header'
import Router from './Router'

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className='flex h-screen bg-[#1A1A2E]'>
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      {/* Main Content */}
      <div className='flex flex-col flex-1 overflow-hidden'>
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className='flex-1 overflow-y-auto p-3 sm:p-4 md:p-6'>
          <Router />
        </main>
      </div>
    </div>
  )
}

export default Layout