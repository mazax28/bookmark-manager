import React from 'react'
import StatsCard from '../components/StatsCard'
import UsageAnalyticsCard from '../components/UsageAnalyticsCard'
import TopBookmarksTable from '../components/TopBookmarksTable'

function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <StatsCard />
      <UsageAnalyticsCard />
      <TopBookmarksTable />
      
    </div>
  )
}

export default Dashboard
