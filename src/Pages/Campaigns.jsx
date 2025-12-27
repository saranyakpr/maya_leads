import React, { useState } from 'react'

const Campaigns = () => {
  const [activeTab, setActiveTab] = useState('single')
  const [scheduleType, setScheduleType] = useState('immediate')
  const [searchTerm, setSearchTerm] = useState('')
  const [messageContent, setMessageContent] = useState('')
  const [targetAccount, setTargetAccount] = useState('')
  const [selectedAccounts, setSelectedAccounts] = useState([])
  const [scheduleDate, setScheduleDate] = useState('')
  const [scheduleTime, setScheduleTime] = useState('')
  const [campaignHistory, setCampaignHistory] = useState([
    { id: 1, name: 'Campaign 1', date: '2024-12-20', status: 'Completed', accounts: 5 },
    { id: 2, name: 'Campaign 2', date: '2024-12-18', status: 'Pending', accounts: 3 },
    { id: 3, name: 'Campaign 3', date: '2024-12-15', status: 'Completed', accounts: 8 },
  ])

  const availableAccounts = [
    { id: 1, name: 'Account 1', status: 'Pending' },
    { id: 2, name: 'Account 2', status: 'Done' },
    { id: 3, name: 'Account 3', status: 'Pending' },
    { id: 4, name: 'Account 4', status: 'Done' },
    { id: 5, name: 'Account 5', status: 'Pending' },
  ]

  const handleCreateCampaign = () => {
    if (activeTab === 'single' && targetAccount && messageContent) {
      alert('Campaign created for single account!')
    } else if (activeTab === 'multiple' && selectedAccounts.length > 0 && messageContent) {
      alert('Campaign created for multiple accounts!')
    }
  }

  const toggleAccountSelection = (accountId) => {
    setSelectedAccounts(prev =>
      prev.includes(accountId)
        ? prev.filter(id => id !== accountId)
        : [...prev, accountId]
    )
  }

  const filteredCampaigns = campaignHistory.filter(campaign =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className='space-y-6'>
      {/* Create New Campaign Section */}
      <div className='bg-[#2D2D44] rounded-lg p-6 border border-gray-700'>
        <h2 className='text-2xl font-bold text-white mb-6'>Create New Campaign</h2>

        {/* Tabs */}
        <div className='flex gap-4 mb-6 border-b border-gray-700 pb-4'>
          <button
            onClick={() => setActiveTab('single')}
            className={`px-4 py-2 font-medium transition-colors cursor-pointer rounded-lg ${
              activeTab === 'single'
                ? 'bg-indigo-600 text-white'
                : 'bg-[#0F0F23] text-white hover:bg-gray-800'
            }`}
          >
            Single Account
          </button>
          <button
            onClick={() => setActiveTab('multiple')}
            className={`px-4 py-2 font-medium transition-colors cursor-pointer rounded-lg ${
              activeTab === 'multiple'
                ? 'bg-indigo-600 text-white'
                : 'bg-[#0F0F23] text-white hover:bg-gray-800'
            }`}
          >
            Multiple Accounts
          </button>
        </div>

        {/* Form Content */}
        <div className='space-y-5'>
          {/* Target Account */}
          <div>
            <label className='block text-sm font-medium text-gray-300 mb-2'>Target Account</label>
            {activeTab === 'single' ? (
              <input
                type='text'
                placeholder='@username'
                value={targetAccount}
                onChange={(e) => setTargetAccount(e.target.value)}
                className='w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500'
              />
            ) : (
              <div className='space-y-3'>
                <div className='text-sm text-gray-400 mb-3'>{selectedAccounts.length} accounts selected</div>
                <div className='bg-gray-800 rounded-lg border border-gray-700 p-4 max-h-48 overflow-y-auto'>
                  <div className='space-y-2'>
                    {availableAccounts.map(account => (
                      <div key={account.id} className='flex items-center gap-3 p-2 hover:bg-gray-700 rounded transition-colors'>
                        <input
                          type='checkbox'
                          checked={selectedAccounts.includes(account.id)}
                          onChange={() => toggleAccountSelection(account.id)}
                          className='rounded'
                        />
                        <span className='text-gray-300 text-sm flex-1'>{account.name}</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          account.status === 'Pending'
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {account.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Message Content */}
          <div>
            <label className='block text-sm font-medium text-gray-300 mb-2'>Message Content</label>
            <textarea
              placeholder='Enter your message here...'
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value.slice(0, 280))}
              className='w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500 resize-none h-28'
            />
            <div className='text-xs text-gray-400 mt-1'>{messageContent.length}/280 characters</div>
          </div>

          {/* Schedule Section */}
          <div>
            <label className='block text-sm font-medium text-gray-300 mb-3'>Schedule</label>
            <div className='flex gap-3 mb-4'>
              <button
                onClick={() => setScheduleType('immediate')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  scheduleType === 'immediate'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-800 border border-gray-700 text-gray-400 hover:text-white'
                }`}
              >
                Send Immediately
              </button>
              <button
                onClick={() => setScheduleType('later')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  scheduleType === 'later'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-800 border border-gray-700 text-gray-400 hover:text-white'
                }`}
              >
                Schedule for Later
              </button>
            </div>

            {scheduleType === 'later' && (
              <div className='grid grid-cols-2 gap-3'>
                <input
                  type='date'
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  className='px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500'
                  placeholder='dd-mm-yyyy'
                />
                <input
                  type='time'
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className='px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500'
                  placeholder='--:--'
                />
              </div>
            )}
          </div>

          {/* Create Campaign Button */}
          <button
            onClick={handleCreateCampaign}
            className='w-full px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors mt-6'
          >
            Create Campaign
          </button>
        </div>
      </div>

      {/* Campaign History Section */}
      <div className='bg-[#2D2D44] rounded-lg p-6 border border-gray-700'>
        <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6'>
          <h2 className='text-xl font-bold text-white'>Campaign History</h2>
          <div className='flex-1 sm:flex-none relative'>
            <svg className='absolute right-3 top-3 w-4 h-4 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
            </svg>
            <input
              type='text'
              placeholder='Search campaigns...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full px-4 py-2 pr-10 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500'
            />
          </div>
        </div>

        {/* History Table */}
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b border-gray-700'>
                <th className='px-4 py-3 text-left text-sm font-semibold text-gray-300'>Campaign Name</th>
                <th className='px-4 py-3 text-left text-sm font-semibold text-gray-300 hidden sm:table-cell'>Date</th>
                <th className='px-4 py-3 text-left text-sm font-semibold text-gray-300 hidden md:table-cell'>Accounts</th>
                <th className='px-4 py-3 text-left text-sm font-semibold text-gray-300'>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredCampaigns.length > 0 ? (
                filteredCampaigns.map(campaign => (
                  <tr key={campaign.id} className='border-b border-gray-700 hover:bg-gray-800/30 transition-colors'>
                    <td className='px-4 py-3 text-sm text-white font-medium'>{campaign.name}</td>
                    <td className='px-4 py-3 text-sm text-gray-400 hidden sm:table-cell'>{campaign.date}</td>
                    <td className='px-4 py-3 text-sm text-gray-400 hidden md:table-cell'>{campaign.accounts}</td>
                    <td className='px-4 py-3 text-sm'>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        campaign.status === 'Completed'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {campaign.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan='4' className='px-4 py-8 text-center text-gray-400'>
                    No campaigns found
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

export default Campaigns