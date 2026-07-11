import { useState } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import { slugify } from '../data/cities'
import TemperatureChart from '../components/charts/TemperatureChart'
import ConditionChart from '../components/charts/ConditionChart'

function Dashboard() {
  const { weatherData } = useOutletContext()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [conditionFilter, setConditionFilter] = useState('All')

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

  return (
    <div className="dashboard">
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

      <section className="charts-grid">
        <div className="chart-card">
          <h2 className="chart-title">Temperature by City</h2>
          <TemperatureChart data={weatherData} />
        </div>
        <div className="chart-card">
          <h2 className="chart-title">Condition Distribution</h2>
          <ConditionChart data={weatherData} />
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
                  <tr
                    key={city.name}
                    className={`row-${city.condition.toLowerCase()} clickable-row`}
                    onClick={() => navigate(`/city/${slugify(city.name)}`)}
                  >
                    <td className="city-name">
                      <Link to={`/city/${slugify(city.name)}`} className="city-link">{city.name}</Link>
                    </td>
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

export default Dashboard
