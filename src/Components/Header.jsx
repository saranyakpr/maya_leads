import React from 'react'
import notification from '../assets/img/notification.png'
import profile from '../assets/img/profile.png'

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className='bg-[#2D2D44] border-b border-gray-700 px-3 sm:px-4 md:px-6 py-3 md:py-4 flex justify-between items-center'>
      <div className='flex items-center gap-3 md:gap-0 flex-1'>
        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className='md:hidden p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white'
        >
          <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
          </svg>
        </button>
        
        {/* Title */}
        <div className='min-w-0'>
          <h1 className='text-lg md:text-2xl font-bold text-white truncate'>Dashboard Overview</h1>
          <p className='text-gray-400 text-xs md:text-sm hidden sm:block'>Monitor your competitor analysis and campaign performance</p>
        </div>
      </div>
      
      {/* Right Section */}
      <div className='flex items-center gap-3 md:gap-4'>
        <button className='p-2 rounded-lg text-white transition-colors hover:bg-gray-700'>
          <img src={notification} alt="Notifications" className='w-4 md:w-5 h-4 md:h-5 object-contain' />
        </button>
        <div className='hidden sm:flex items-center gap-2'>
          <img src={profile} alt="Profile" className='w-7 md:w-8 h-7 md:h-8 rounded-full object-cover' />
          <span className='text-white text-xs md:text-sm'>UserName</span>
        </div>
      </div>
    </header>
  )
}

export default Header