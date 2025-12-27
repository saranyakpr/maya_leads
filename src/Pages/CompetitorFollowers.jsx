import React, { useState } from 'react'

const CompetitorFollowers = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('Username')
  const [followers, setFollowers] = useState([
    { id: 1, username: '@user123', competitorName: 'Competitor 1', status: 'notified' },
    { id: 2, username: '@sarah_smith', competitorName: 'Competitor 2', status: 'unnotified' },
    { id: 3, username: '@john_doe', competitorName: 'Competitor 1', status: 'notified' },
    { id: 4, username: '@emma_wilson', competitorName: 'Competitor 3', status: 'notified' },
    { id: 5, username: '@alex_jones', competitorName: 'Competitor 2', status: 'unnotified' },
    { id: 6, username: '@mike_brown', competitorName: 'Competitor 1', status: 'notified' },
    { id: 7, username: '@lisa_taylor', competitorName: 'Competitor 4', status: 'unnotified' },
    { id: 8, username: '@david_miller', competitorName: 'Competitor 3', status: 'notified' },
  ])

  const filteredFollowers = followers.filter(follower =>
    follower.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    follower.competitorName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const notifiedCount = followers.filter(f => f.status === 'notified').length
  const unnotifiedCount = followers.filter(f => f.status === 'unnotified').length

  return (
    <div className='space-y-6'>
      {/* Search and Filter Section */}
      <div className='bg-[#2D2D44] rounded-lg p-4 md:p-6 border border-gray-700'>
        <div className='flex flex-col sm:flex-row gap-4 mb-4'>
          <div className='flex-1 relative'>
            <svg className='absolute left-3 top-3 w-4 h-4 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
            </svg>
            <input
              type='text'
              placeholder='Search followers...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500'
            />
          </div>
          <div className='flex items-center gap-2'>
            <span className='text-gray-400 text-sm'>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className='px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500'
            >
              <option>Username</option>
              <option>Competitor Name</option>
              <option>Status</option>
            </select>
          </div>
        </div>

        {/* Status Indicators */}
        <div className='flex items-center gap-6 text-sm'>
          <div className='flex items-center gap-2'>
            <span className='w-3 h-3 rounded-full bg-green-500'></span>
            <span className='text-gray-400'>notified</span>
          </div>
          <div className='flex items-center gap-2'>
            <span className='w-3 h-3 rounded-full bg-gray-500'></span>
            <span className='text-gray-400'>unnotified</span>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className='bg-[#2D2D44] rounded-lg border border-gray-700 overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b border-gray-700 bg-gray-800/50'>
                <th className='px-4 py-3 text-left text-sm font-semibold text-gray-300'>
                  <input type='checkbox' className='rounded' />
                </th>
                <th className='px-4 py-3 text-left text-sm font-semibold text-gray-300'>Username</th>
                <th className='px-4 py-3 text-left text-sm font-semibold text-gray-300 hidden sm:table-cell'>Competitor Name</th>
                <th className='px-4 py-3 text-left text-sm font-semibold text-gray-300'>Status</th>
                <th className='px-4 py-3 text-left text-sm font-semibold text-gray-300'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFollowers.length > 0 ? (
                filteredFollowers.map((follower) => (
                  <tr key={follower.id} className='border-b border-gray-700 hover:bg-gray-800/30 transition-colors'>
                    <td className='px-4 py-3'>
                      <input type='checkbox' className='rounded' />
                    </td>
                    <td className='px-4 py-3 text-sm text-white font-medium'>{follower.username}</td>
                    <td className='px-4 py-3 text-sm text-gray-400 hidden sm:table-cell'>{follower.competitorName}</td>
                    <td className='px-4 py-3 text-sm'>
                      <div className='flex items-center gap-2'>
                        <span className={`w-2 h-2 rounded-full ${
                          follower.status === 'notified'
                            ? 'bg-green-500'
                            : 'bg-gray-500'
                        }`}></span>
                        <span className={`text-xs font-medium capitalize ${
                          follower.status === 'notified'
                            ? 'text-green-400'
                            : 'text-gray-400'
                        }`}>
                          {follower.status}
                        </span>
                      </div>
                    </td>
                    <td className='px-4 py-3 text-sm'>
                      <button className='text-indigo-400 hover:text-indigo-300 font-medium transition-colors cursor-pointer'>
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan='5' className='px-4 py-8 text-center text-gray-400'>
                    No followers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default CompetitorFollowers