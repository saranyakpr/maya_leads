import React, { useState } from 'react'

const Competitors = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [competitors, setCompetitors] = useState([
    { id: 1, name: 'Competitor 1', url: 'instagram.com/user1', followers: 15420, joinDate: '15/05/2024', status: 'Active' },
    { id: 2, name: 'Competitor 2', url: 'instagram.com/user2', followers: 8950, joinDate: '10/03/2024', status: 'Inactive' }
  ])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('Username')
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    followers: '',
    joinDate: '',
  })

  const handleAddCompetitor = () => {
    if (formData.name && formData.url && formData.followers && formData.joinDate) {
      const newCompetitor = {
        id: competitors.length + 1,
        name: formData.name,
        url: formData.url,
        followers: formData.followers,
        joinDate: formData.joinDate,
        status: 'Active',
      }
      setCompetitors([...competitors, newCompetitor])
      setFormData({ name: '', url: '', followers: '', joinDate: '' })
      setIsModalOpen(false)
    }
  }

  const handleEditCompetitor = () => {
    if (formData.name && formData.url && formData.followers && formData.joinDate) {
      setCompetitors(
        competitors.map(comp =>
          comp.id === editingId
            ? {
                ...comp,
                name: formData.name,
                url: formData.url,
                followers: formData.followers,
                joinDate: formData.joinDate,
              }
            : comp
        )
      )
      setFormData({ name: '', url: '', followers: '', joinDate: '' })
      setIsEditModalOpen(false)
      setEditingId(null)
    }
  }

  const openEditModal = (competitor) => {
    setEditingId(competitor.id)
    setFormData({
      name: competitor.name,
      url: competitor.url,
      followers: competitor.followers,
      joinDate: competitor.joinDate,
    })
    setIsEditModalOpen(true)
  }

  const filteredCompetitors = competitors.filter(competitor =>
    competitor.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const activeCount = competitors.filter(c => c.status === 'Active').length
  const inactiveCount = competitors.filter(c => c.status === 'Inactive').length

  return (
    <div className='space-y-6'>
      {/* Header Section */}
      <div className='flex flex-col sm:flex-row sm:justify-end sm:items-center gap-4'>
        <button
          onClick={() => setIsModalOpen(true)}
          className='px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors text-sm md:text-base cursor-pointer'
        >
          + Add Competitor
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className='bg-[#2D2D44] rounded-lg p-4 md:p-6 border border-gray-700'>
        <div className='flex flex-col sm:flex-row gap-4 mb-4'>
          <div className='flex-1 relative'>
            <svg className='absolute left-3 top-3 w-4 h-4 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
            </svg>
            <input
              type='text'
              placeholder='Search competitors...'
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
              <option>Followers</option>
              <option>Join Date</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className='flex items-center gap-4 text-sm'>
          <span className='text-gray-400'>{filteredCompetitors.length} competitors</span>
          <div className='flex items-center gap-2'>
            <span className='w-2 h-2 rounded-full bg-green-500'></span>
            <span className='text-gray-400'>Active</span>
          </div>
          <div className='flex items-center gap-2'>
            <span className='w-2 h-2 rounded-full bg-gray-500'></span>
            <span className='text-gray-400'>Inactive</span>
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
                <th className='px-4 py-3 text-left text-sm font-semibold text-gray-300'>Competitor</th>
                <th className='px-4 py-3 text-left text-sm font-semibold text-gray-300 hidden sm:table-cell'>URL</th>
                <th className='px-4 py-3 text-left text-sm font-semibold text-gray-300 hidden md:table-cell'>Followers</th>
                <th className='px-4 py-3 text-left text-sm font-semibold text-gray-300 hidden lg:table-cell'>Join Date</th>
                <th className='px-4 py-3 text-left text-sm font-semibold text-gray-300'>Status</th>
                <th className='px-4 py-3 text-left text-sm font-semibold text-gray-300'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCompetitors.length > 0 ? (
                filteredCompetitors.map((competitor) => (
                  <tr key={competitor.id} className='border-b border-gray-700 hover:bg-gray-800/30 transition-colors'>
                    <td className='px-4 py-3'>
                      <input type='checkbox' className='rounded' />
                    </td>
                    <td className='px-4 py-3 text-sm text-white font-medium'>{competitor.name}</td>
                    <td className='px-4 py-3 text-sm text-gray-400 hidden sm:table-cell'>{competitor.url}</td>
                    <td className='px-4 py-3 text-sm text-gray-400 hidden md:table-cell'>{competitor.followers.toLocaleString()}</td>
                    <td className='px-4 py-3 text-sm text-gray-400 hidden lg:table-cell'>{competitor.joinDate}</td>
                    <td className='px-4 py-3 text-sm'>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        competitor.status === 'Active'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-gray-600/20 text-gray-400'
                      }`}>
                        {competitor.status}
                      </span>
                    </td>
                    <td className='px-4 py-3 text-sm'>
                      <button 
                        onClick={() => openEditModal(competitor)}
                        className='text-indigo-400 hover:text-indigo-300 font-medium transition-colors cursor-pointer'
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan='7' className='px-4 py-8 text-center text-gray-400'>
                    No competitors found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Competitor Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-[#000000b3] bg-opacity-50 flex items-center justify-center z-50 p-4'>
          <div className='bg-[#2D2D44] rounded-lg border border-gray-700 w-full max-w-md'>
            {/* Modal Header */}
            <div className='flex justify-between items-center p-6 border-b border-gray-700'>
              <h2 className='text-lg font-bold text-white'>Add New Competitor</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className='text-gray-400 hover:text-white transition-colors cursor-pointer'
              >
                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className='p-6 space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-300 mb-2'>Competitor name</label>
                <input
                  type='text'
                  placeholder='Username'
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className='w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-300 mb-2'>Instagram URL or Username</label>
                <input
                  type='text'
                  placeholder='https://instagram.com/username or @username'
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className='w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-300 mb-2'>Followers</label>
                <input
                  type='text'
                  placeholder='@xolufgh'
                  value={formData.followers}
                  onChange={(e) => setFormData({ ...formData, followers: e.target.value })}
                  className='w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-300 mb-2'>Join Date</label>
                <input
                  type='date'
                  value={formData.joinDate}
                  onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                  className='w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500'
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className='flex gap-3 justify-end p-6 border-t border-gray-700'>
              <button
                onClick={() => setIsModalOpen(false)}
                className='px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors text-sm cursor-pointer'
              >
                Cancel
              </button>
              <button
                onClick={handleAddCompetitor}
                className='px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors text-sm cursor-pointer'
              >
                Add Competitor
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Competitor Modal */}
      {isEditModalOpen && (
        <div className='fixed inset-0 bg-[#000000b3] bg-opacity-50 flex items-center justify-center z-50 p-4'>
          <div className='bg-[#2D2D44] rounded-lg border border-gray-700 w-full max-w-md'>
            {/* Modal Header */}
            <div className='flex justify-between items-center p-6 border-b border-gray-700'>
              <h2 className='text-lg font-bold text-white'>Edit Competitor</h2>
              <button
                onClick={() => {
                  setIsEditModalOpen(false)
                  setEditingId(null)
                  setFormData({ name: '', url: '', followers: '', joinDate: '' })
                }}
                className='text-gray-400 hover:text-white transition-colors cursor-pointer'
              >
                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className='p-6 space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-300 mb-2'>Competitor name</label>
                <input
                  type='text'
                  placeholder='Username'
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className='w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-300 mb-2'>Instagram URL or Username</label>
                <input
                  type='text'
                  placeholder='https://instagram.com/username or @username'
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className='w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-300 mb-2'>Followers</label>
                <input
                  type='text'
                  placeholder='@xolufgh'
                  value={formData.followers}
                  onChange={(e) => setFormData({ ...formData, followers: e.target.value })}
                  className='w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-300 mb-2'>Join Date</label>
                <input
                  type='date'
                  value={formData.joinDate}
                  onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                  className='w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500'
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className='flex gap-3 justify-end p-6 border-t border-gray-700'>
              <button
                onClick={() => {
                  setIsEditModalOpen(false)
                  setEditingId(null)
                  setFormData({ name: '', url: '', followers: '', joinDate: '' })
                }}
                className='px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors text-sm cursor-pointer'
              >
                Cancel
              </button>
              <button
                onClick={handleEditCompetitor}
                className='px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors text-sm cursor-pointer'
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Competitors