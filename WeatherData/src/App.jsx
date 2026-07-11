import { Route, Routes } from 'react-router-dom'
import Layout from './layouts/Layout'
import Dashboard from './pages/Dashboard'
import CityDetail from './pages/CityDetail'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="city/:slug" element={<CityDetail />} />
      </Route>
    </Routes>
  )
}

export default App
