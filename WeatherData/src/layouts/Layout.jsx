import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { CITIES, getCondition, getConditionEmoji } from '../data/cities'

const CURRENT_FIELDS = [
  'temperature_2m',
  'relative_humidity_2m',
  'wind_speed_10m',
  'wind_direction_10m',
  'weather_code',
  'apparent_temperature',
  'pressure_msl',
  'cloud_cover',
  'precipitation',
  'is_day',
].join(',')

function Layout() {
  const [weatherData, setWeatherData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAllCities = async () => {
      try {
        const results = await Promise.all(
          CITIES.map(async (city) => {
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=${CURRENT_FIELDS}&timezone=auto`
            const res = await fetch(url)
            if (!res.ok) throw new Error(`Failed to fetch ${city.name}`)
            const data = await res.json()
            const current = data.current
            const condition = getCondition(current.weather_code)
            return {
              ...city,
              temp: Math.round(current.temperature_2m),
              feelsLike: Math.round(current.apparent_temperature),
              humidity: current.relative_humidity_2m,
              windSpeed: Math.round(current.wind_speed_10m),
              windDirection: current.wind_direction_10m,
              pressure: Math.round(current.pressure_msl),
              cloudCover: current.cloud_cover,
              precipitation: current.precipitation,
              isDay: current.is_day === 1,
              condition,
              emoji: getConditionEmoji(condition),
            }
          })
        )
        setWeatherData(results)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAllCities()
  }, [])

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Fetching live weather data…</p>
      </div>
    )
  }

  if (error) {
    return <div className="error">Error: {error}</div>
  }

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="app-main">
        <Outlet context={{ weatherData }} />
      </main>
    </div>
  )
}

export default Layout
