import { useState, useEffect } from 'react'
import './App.css'

const CITIES = [
  { name: 'New York',    country: 'USA',         lat: 40.71,  lon: -74.01 },
  { name: 'London',      country: 'UK',           lat: 51.51,  lon: -0.13  },
  { name: 'Paris',       country: 'France',       lat: 48.85,  lon: 2.35   },
  { name: 'Tokyo',       country: 'Japan',        lat: 35.69,  lon: 139.69 },
  { name: 'Sydney',      country: 'Australia',    lat: -33.87, lon: 151.21 },
  { name: 'Dubai',       country: 'UAE',          lat: 25.20,  lon: 55.27  },
  { name: 'Chicago',     country: 'USA',          lat: 41.88,  lon: -87.63 },
  { name: 'Los Angeles', country: 'USA',          lat: 34.05,  lon: -118.24},
  { name: 'Berlin',      country: 'Germany',      lat: 52.52,  lon: 13.40  },
  { name: 'Toronto',     country: 'Canada',       lat: 43.65,  lon: -79.38 },
  { name: 'Mumbai',      country: 'India',        lat: 19.08,  lon: 72.88  },
  { name: 'São Paulo',   country: 'Brazil',       lat: -23.55, lon: -46.63 },
  { name: 'Cape Town',   country: 'South Africa', lat: -33.93, lon: 18.42  },
  { name: 'Seoul',       country: 'South Korea',  lat: 37.57,  lon: 126.98 },
  { name: 'Moscow',      country: 'Russia',       lat: 55.75,  lon: 37.62  },
]

function getCondition(code) {
  if (code === 0) return 'Clear'
  if (code <= 3) return 'Cloudy'
  if (code <= 48) return 'Foggy'
  if (code <= 67) return 'Rainy'
  if (code <= 77) return 'Snowy'
  if (code <= 86) return 'Rainy'
  return 'Stormy'
}

function getConditionEmoji(condition) {
  const map = {
    Clear: '☀️',
    Cloudy: '☁️',
    Foggy: '🌫️',
    Rainy: '🌧️',
    Snowy: '❄️',
    Stormy: '⛈️',
  }
  return map[condition] || '🌡️'
}

function App() {
  const [weatherData, setWeatherData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [conditionFilter, setConditionFilter] = useState('All')

  useEffect(() => {
    const fetchAllCities = async () => {
      try {
        const results = await Promise.all(
          CITIES.map(async (city) => {
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`
            const res = await fetch(url)
            if (!res.ok) throw new Error(`Failed to fetch ${city.name}`)
            const data = await res.json()
            const current = data.current
            const condition = getCondition(current.weather_code)
            return {
              ...city,
              temp: Math.round(current.temperature_2m),
              humidity: current.relative_humidity_2m,
              windSpeed: Math.round(current.wind_speed_10m),
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

  const conditions = ['All', ...new Set(weatherData.map((c) => c.condition))]

  const filtered = weatherData.filter((city) => {
    const matchesSearch = city.name.toLowerCase().includes(search.toLowerCase()) ||
      city.country.toLowerCase().includes(search.toLowerCase())
    const matchesCondition = conditionFilter === 'All' || city.condition === conditionFilter
    return matchesSearch && matchesCondition
  })

  const avgTemp = weatherData.length
    ? Math.round(weatherData.reduce((sum, c) => sum + c.temp, 0) / weatherData.length)
    : null

  const hottestCity = weatherData.length
    ? weatherData.reduce((max, c) => (c.temp > max.temp ? c : max), weatherData[0])
    : null

  const avgHumidity = weatherData.length
    ? Math.round(weatherData.reduce((sum, c) => sum + c.humidity, 0) / weatherData.length)
    : null

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
    <div className="app">
      <header className="header">
        <h1>🌍 Global Weather Dashboard</h1>
        <p className="subtitle">Live conditions across {weatherData.length} cities</p>
      </header>

      <section className="stats-bar">
        <div className="stat-card">
          <span className="stat-label">Avg Temperature</span>
          <span className="stat-value">{avgTemp}°C</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Hottest City</span>
          <span className="stat-value">{hottestCity?.name} {hottestCity?.temp}°C</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Avg Humidity</span>
          <span className="stat-value">{avgHumidity}%</span>
        </div>
      </section>

      <section className="controls">
        <input
          type="text"
          className="search-input"
          placeholder="Search by city or country…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="filter-select"
          value={conditionFilter}
          onChange={(e) => setConditionFilter(e.target.value)}
        >
          {conditions.map((c) => (
            <option key={c} value={c}>{c === 'All' ? 'All Conditions' : c}</option>
          ))}
        </select>
      </section>

      <section className="table-section">
        <div className="results-count">{filtered.length} city{filtered.length !== 1 ? 'ies' : 'y'} shown</div>
        <div className="table-wrapper">
          <table className="weather-table">
            <thead>
              <tr>
                <th>City</th>
                <th>Country</th>
                <th>Condition</th>
                <th>Temp (°C)</th>
                <th>Humidity (%)</th>
                <th>Wind (km/h)</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" className="no-results">No cities match your search or filter.</td>
                </tr>
              ) : (
                filtered.map((city) => (
                  <tr key={city.name} className={`row-${city.condition.toLowerCase()}`}>
                    <td className="city-name">{city.name}</td>
                    <td className="city-country">{city.country}</td>
                    <td className="city-condition">
                      <span className="condition-badge">
                        {city.emoji} {city.condition}
                      </span>
                    </td>
                    <td className="city-temp">
                      <span className={`temp-pill ${city.temp >= 30 ? 'hot' : city.temp <= 5 ? 'cold' : 'mild'}`}>
                        {city.temp}°
                      </span>
                    </td>
                    <td>{city.humidity}%</td>
                    <td>{city.windSpeed} km/h</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export default App
