import React, { useState } from 'react'

const Leads = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All Statuses')
  const [campaignFilter, setCampaignFilter] = useState('')
  const [selectedLeads, setSelectedLeads] = useState([])
  const [leads, setLeads] = useState([
    { id: 1, name: '@user123', campaign: 'Campaign 1', message: 'Interested in the product', dateTime: '2024-12-20 14:30', status: 'Responded' },
    { id: 2, name: '@sarah_smith', campaign: 'Campaign 2', message: 'Please send more info', dateTime: '2024-12-20 13:15', status: 'Responded' },
    { id: 3, name: '@john_doe', campaign: 'Campaign 1', message: 'Not interested', dateTime: '2024-12-19 10:45', status: 'Not Interested' },
    { id: 4, name: '@emma_wilson', campaign: 'Campaign 3', message: 'When is the launch date?', dateTime: '2024-12-19 09:20', status: 'Responded' },
    { id: 5, name: '@alex_jones', campaign: 'Campaign 2', message: 'Can I get a discount?', dateTime: '2024-12-18 16:30', status: 'Responded' },
    { id: 6, name: '@mike_brown', campaign: 'Campaign 1', message: 'No response yet', dateTime: '2024-12-18 11:00', status: 'Pending' },
    { id: 7, name: '@lisa_taylor', campaign: 'Campaign 4', message: 'Interested', dateTime: '2024-12-17 15:45', status: 'Responded' },
    { id: 8, name: '@david_miller', campaign: 'Campaign 3', message: 'Already purchased', dateTime: '2024-12-17 12:30', status: 'Converted' },
  ])

  const campaigns = ['Campaign 1', 'Campaign 2', 'Campaign 3', 'Campaign 4']

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'All Statuses' || lead.status === statusFilter
    const matchesCampaign = !campaignFilter || lead.campaign === campaignFilter
    return matchesSearch && matchesStatus && matchesCampaign
  })

  const handleSelectAll = () => {
    if (selectedLeads.length === filteredLeads.length) {
      setSelectedLeads([])
    } else {
      setSelectedLeads(filteredLeads.map(lead => lead.id))
    }
  }

  const handleClearAll = () => {
    setSelectedLeads([])
  }

  const toggleLeadSelection = (leadId) => {
    setSelectedLeads(prev =>
      prev.includes(leadId)
        ? prev.filter(id => id !== leadId)
        : [...prev, leadId]
    )
  }

  const handleExportLeads = () => {
    alert(`Exporting ${selectedLeads.length > 0 ? selectedLeads.length : filteredLeads.length} leads...`)
  }

  return (
    <div className='space-y-6'>
      {/* Header with Export Button */}
      <div className='flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4'>
        <div>
          <h1 className='text-2xl md:text-3xl font-bold text-white'>Campaign Leads</h1>
        </div>
        <button
          onClick={handleExportLeads}
          className='px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors text-sm self-start sm:self-auto'
        >
          Export Leads
        </button>
      </div>

      {/* Filters and Controls */}
      <div className='bg-[#2D2D44] rounded-lg p-4 md:p-6 border border-gray-700'>
        <div className='flex flex-col gap-4'>
          {/* Search Bar */}
          <div className='relative'>
            <svg className='absolute left-3 top-3 w-4 h-4 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
            </svg>
            <input
              type='text'
              placeholder='Search leads...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500'
            />
          </div>

          {/* Filters and Buttons Row */}
          <div className='flex flex-col sm:flex-row gap-3 items-stretch sm:items-center'>
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className='px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500 cursor-pointer'
            >
              <option>All Statuses</option>
              <option>Responded</option>
              <option>Not Interested</option>
              <option>Pending</option>
              <option>Converted</option>
            </select>

            {/* Campaign Filter */}
            <select
              value={campaignFilter}
              onChange={(e) => setCampaignFilter(e.target.value)}
              className='px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500 cursor-pointer'
            >
              <option value=''>Choose option...</option>
              {campaigns.map(campaign => (
                <option key={campaign} value={campaign}>{campaign}</option>
              ))}
            </select>

            {/* Action Buttons */}
            <div className='flex gap-2 sm:ml-auto'>
              <button
                onClick={handleSelectAll}
                className='px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors text-sm'
              >
                Select All
              </button>
              <button
                onClick={handleClearAll}
                className='px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors text-sm'
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className='bg-[#2D2D44] rounded-lg border border-gray-700 overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b border-gray-700 bg-gray-800/50'>
                <th className='px-4 py-3 text-left text-sm font-semibold text-gray-300'>
                  <input
                    type='checkbox'
                    checked={selectedLeads.length === filteredLeads.length && filteredLeads.length > 0}
                    onChange={handleSelectAll}
                    className='rounded'
                  />
                </th>
                <th className='px-4 py-3 text-left text-sm font-semibold text-gray-300'>Name / Username</th>
                <th className='px-4 py-3 text-left text-sm font-semibold text-gray-300 hidden sm:table-cell'>Campaign</th>
                <th className='px-4 py-3 text-left text-sm font-semibold text-gray-300 hidden md:table-cell'>Message</th>
                <th className='px-4 py-3 text-left text-sm font-semibold text-gray-300 hidden lg:table-cell'>Date & Time</th>
                <th className='px-4 py-3 text-left text-sm font-semibold text-gray-300'>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.length > 0 ? (
                filteredLeads.map(lead => (
                  <tr key={lead.id} className='border-b border-gray-700 hover:bg-gray-800/30 transition-colors'>
                    <td className='px-4 py-3'>
                      <input
                        type='checkbox'
                        checked={selectedLeads.includes(lead.id)}
                        onChange={() => toggleLeadSelection(lead.id)}
                        className='rounded'
                      />
                    </td>
                    <td className='px-4 py-3 text-sm text-white font-medium'>{lead.name}</td>
                    <td className='px-4 py-3 text-sm text-gray-400 hidden sm:table-cell'>{lead.campaign}</td>
                    <td className='px-4 py-3 text-sm text-gray-400 hidden md:table-cell truncate max-w-xs'>{lead.message}</td>
                    <td className='px-4 py-3 text-sm text-gray-400 hidden lg:table-cell'>{lead.dateTime}</td>
                    <td className='px-4 py-3 text-sm'>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        lead.status === 'Responded'
                          ? 'bg-green-500/20 text-green-400'
                          : lead.status === 'Converted'
                          ? 'bg-blue-500/20 text-blue-400'
                          : lead.status === 'Not Interested'
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan='6' className='px-4 py-8 text-center text-gray-400'>
                    No leads found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selection Counter */}
      {selectedLeads.length > 0 && (
        <div className='flex justify-between items-center p-4 bg-indigo-600/10 border border-indigo-600/30 rounded-lg'>
          <span className='text-sm text-indigo-400'>
            {selectedLeads.length} lead{selectedLeads.length !== 1 ? 's' : ''} selected
          </span>
          <button
            onClick={handleExportLeads}
            className='px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors text-sm'
          >
            Export Selected
          </button>
        </div>
      )}
    </div>
  )
}

export default Leads