import React from 'react'
import userCount from '../assets/img/userCount.png'
import activeCounter from '../assets/img/activeCounter.png'
import follower from '../assets/img/follower.png'
import heart from '../assets/img/heart.png'
import upArrow from '../assets/img/upArrow.png'
import downArrow from '../assets/img/upArrow.png'

const Dashboard = () => {
  const metrics = [
    { label: 'Total Competitors', value: '47', changePercent: '3%', changePeriod: 'this month', changeType: 'down', icon: userCount, color: 'from-indigo-600 to-indigo-400' },
    { label: 'Active Campaigns', value: '23', changePercent: '4%', changePeriod: 'this week', changeType: 'up', icon: activeCounter, color: 'from-pink-600 to-pink-400' },
    { label: 'Followers Gained', value: '18.7K', changePercent: '24%', changePeriod: 'this month', changeType: 'up', icon: follower, color: 'from-green-600 to-green-400' },
    { label: 'Avg Engagement', value: '4.2%', changePercent: '0.5%', changePeriod: 'this week', changeType: 'down', icon: heart, color: 'from-yellow-500 to-yellow-300' },
  ]

  return (
    <div className='space-y-4 md:space-y-6'>
      {/* Metrics Cards */}
      <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6'>
        {metrics.map((metric, index) => (
          <div key={index} className='bg-[#2D2D44] rounded-lg p-3 sm:p-4 md:p-6 border border-gray-700 hover:border-gray-700 transition-colors'>
            <div className='flex justify-between items-start mb-3 md:mb-4'>
              <div className='min-w-0 flex-1'>
                <p className='text-gray-400 text-xs md:text-sm font-medium truncate'>{metric.label}</p>
                <h3 className='text-xl sm:text-2xl md:text-3xl font-bold text-white mt-1 md:mt-2'>{metric.value}</h3>
              </div>
              <div className={`bg-gradient-to-br ${metric.color} p-2 md:p-3 rounded-lg flex-shrink-0 flex items-center justify-center`}>
                <img src={metric.icon} alt={metric.label} className='w-6 md:w-7 h-6 md:h-7 object-contain' />
              </div>
            </div>
            <p className={`text-xs font-medium flex items-center gap-1 ${
              metric.changeType === 'up' ? 'text-green-400' : 'text-red-400'
            }`}>
              <img 
                src={metric.changeType === 'up' ? upArrow : downArrow} 
                alt={metric.changeType} 
                className='w-4 h-4 object-contain' 
              />
              {metric.changePercent} {metric.changePeriod}
            </p>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6'>
        {/* Followers Growth Chart */}
        <div className='bg-[#2D2D44] rounded-lg p-3 sm:p-4 md:p-6 border border-gray-700'>
          <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4 md:mb-6'>
            <h2 className='text-base md:text-lg font-bold text-white'>Followers Growth</h2>
            <div className='flex gap-2'>
              <button className='px-2 sm:px-3 py-1 bg-indigo-600 text-white text-xs rounded font-medium hover:bg-indigo-700 transition-colors'>1M</button>
              <button className='px-2 sm:px-3 py-1 bg-gray-700 text-gray-400 text-xs rounded font-medium hover:bg-gray-600 transition-colors'>1Y</button>
            </div>
          </div>
          <div className='h-40 sm:h-48 bg-gray-700 rounded flex items-center justify-center'>
            <p className='text-gray-500 text-sm'>Chart placeholder</p>
          </div>
        </div>

        {/* Campaign Performance */}
        <div className='bg-[#2D2D44] rounded-lg p-3 sm:p-4 md:p-6 border border-gray-700'>
          <h2 className='text-base md:text-lg font-bold text-white mb-4 md:mb-6'>Campaign Performance</h2>
          <div className='space-y-3 md:space-y-4'>
            <div>
              <div className='flex justify-between items-center mb-2'>
                <span className='text-gray-400 text-xs md:text-sm'>Budget: $</span>
                <span className='text-indigo-400 text-xs md:text-sm font-medium'>75%</span>
              </div>
              <div className='h-2 bg-gray-700 rounded-full overflow-hidden'>
                <div className='h-full w-3/4 bg-gradient-to-r from-indigo-600 to-indigo-400'></div>
              </div>
            </div>
            <div>
              <div className='flex justify-between items-center mb-2'>
                <span className='text-gray-400 text-xs md:text-sm'>ROI: x</span>
                <span className='text-green-400 text-xs md:text-sm font-medium'>42%</span>
              </div>
              <div className='h-2 bg-gray-700 rounded-full overflow-hidden'>
                <div className='h-full w-5/12 bg-gradient-to-r from-green-600 to-green-400'></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity & Engagement Rates */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6'>
        {/* Recent Activity */}
        <div className='bg-[#2D2D44] rounded-lg p-3 sm:p-4 md:p-6 border border-gray-700'>
          <h2 className='text-base md:text-lg font-bold text-white mb-3 md:mb-4'>Recent Activity</h2>
          <div className='space-y-2 md:space-y-3'>
            {[1, 2, 3].map((item) => (
              <div key={item} className='p-2 sm:p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer'>
                <p className='text-white text-xs md:text-sm font-medium'>Activity #{item}</p>
                <p className='text-gray-400 text-xs mt-1'>2 hours ago</p>
              </div>
            ))}
          </div>
        </div>

        {/* Engagement Rates */}
        <div className='bg-[#2D2D44] rounded-lg p-3 sm:p-4 md:p-6 border border-gray-700'>
          <h2 className='text-base md:text-lg font-bold text-white mb-3 md:mb-4'>Engagement Rates</h2>
          <div className='flex justify-center items-center h-32 md:h-40'>
            <div className='w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-indigo-600 to-indigo-400 flex items-center justify-center'>
              <span className='text-xl sm:text-2xl font-bold text-white'>42%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard