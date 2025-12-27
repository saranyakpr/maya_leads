import { Route, Routes } from 'react-router-dom'
import Dashboard from '../Pages/Dashboard'
import Competitors from '../Pages/Competitors'
import CompetitorFollowers from '../Pages/CompetitorFollowers'
import Campaigns from '../Pages/Campaigns'
import Leads from '../Pages/Leads'

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/competitors' element={<Competitors />} />
      <Route path='/followers' element={<CompetitorFollowers />} />
      <Route path='/campaigns' element={<Campaigns />} />
      <Route path='/leads' element={<Leads />} />
    </Routes>
  )
}

export default Router