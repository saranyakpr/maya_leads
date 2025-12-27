import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import dashboard from '../assets/img/dashboard.png'
import counter from '../assets/img/counter.png'
import user from '../assets/img/user.png'
import logo from '../assets/img/logo.png'

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: dashboard, path: '/dashboard' },
    { id: 'competitors', label: 'Competitors', icon: user, path: '/competitors' },
    { id: 'followers', label: 'Competitors Followers', icon: counter, path: '/followers' },
    { id: 'campaigns', label: 'Campaigns', icon: counter, path: '/campaigns' },
    { id: 'leads', label: 'Leads', icon: counter, path: '/leads' },
  ]

  const handleNavigation = (path) => {
    navigate(path)
    setSidebarOpen(false)
  }

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden'
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static w-64 h-screen bg-[#2D2D44] border-r border-gray-700 flex flex-col z-40 transform transition-transform duration-300 md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className='p-4 md:p-6 border-gray-700'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <div className='w-9 md:w-10 h-9 md:h-10 rounded-lg bg-indigo-600 flex items-center justify-center flex-shrink-0'>
                <img src={logo} alt="CompetitorPro Logo" className='w-6 md:w-7 h-6 md:h-7 object-contain' />
              </div>
              <div className='min-w-0'>
                <h1 className='text-white font-bold text-lg'>CompetitorPro</h1>
              </div>
            </div>
            {/* Close button on mobile */}
            <button
              onClick={() => setSidebarOpen(false)}
              className='md:hidden p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700'
            >
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className='flex-1 px-3 md:px-4 py-4 md:py-6'>
          <ul className='space-y-2'>
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center gap-3 px-3 md:px-4 py-2 md:py-3 rounded-lg transition-colors text-sm md:text-base cursor-pointer ${
                    location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/')
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <img src={item.icon} alt={item.label} className='w-5 md:w-6 h-5 md:h-6 object-contain flex-shrink-0' />
                  <span className='font-medium whitespace-nowrap'>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  )
}

export default Sidebar