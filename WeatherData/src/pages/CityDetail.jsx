import { Link, useOutletContext, useParams } from 'react-router-dom'
import { degreesToCompass, slugify } from '../data/cities'
import ComparisonChart from '../components/charts/ComparisonChart'

function CityDetail() {
  const { slug } = useParams()
  const { weatherData } = useOutletContext()
  const city = weatherData.find((c) => slugify(c.name) === slug)

  if (!city) {
    return (
      <div className="detail-view">
        <p className="not-found">City not found.</p>
        <Link to="/" className="back-link">← Back to Dashboard</Link>
      </div>
    )
  }

  const avgTemp = weatherData.reduce((sum, c) => sum + c.temp, 0) / weatherData.length
  const avgHumidity = weatherData.reduce((sum, c) => sum + c.humidity, 0) / weatherData.length
  const avgWind = weatherData.reduce((sum, c) => sum + c.windSpeed, 0) / weatherData.length

  const metrics = [
    { key: 'temp', label: 'Temperature', diff: ((city.temp - avgTemp) / avgTemp) * 100 },
    { key: 'humidity', label: 'Humidity', diff: ((city.humidity - avgHumidity) / avgHumidity) * 100 },
    { key: 'wind', label: 'Wind Speed', diff: ((city.windSpeed - avgWind) / avgWind) * 100 },
  ]

  return (
    <div className="detail-view">
      <Link to="/" className="back-link">← Back to Dashboard</Link>

      <header className="detail-header">
        <div>
          <h1>{city.emoji} {city.name}</h1>
          <p className="subtitle">{city.country}</p>
        </div>
        <div className="detail-temp">
          <span className="detail-temp-value">{city.temp}°C</span>
          <span className="condition-badge">{city.emoji} {city.condition}</span>
        </div>
      </header>

      <section className="detail-grid">
        <div className="detail-card">
          <span className="stat-label">Feels Like</span>
          <span className="stat-value">{city.feelsLike}°C</span>
        </div>
        <div className="detail-card">
          <span className="stat-label">Humidity</span>
          <span className="stat-value">{city.humidity}%</span>
        </div>
        <div className="detail-card">
          <span className="stat-label">Wind Speed</span>
          <span className="stat-value">{city.windSpeed} km/h</span>
        </div>
        <div className="detail-card">
          <span className="stat-label">Wind Direction</span>
          <span className="stat-value">{degreesToCompass(city.windDirection)}</span>
        </div>
        <div className="detail-card">
          <span className="stat-label">Pressure</span>
          <span className="stat-value">{city.pressure} hPa</span>
        </div>
        <div className="detail-card">
          <span className="stat-label">Cloud Cover</span>
          <span className="stat-value">{city.cloudCover}%</span>
        </div>
        <div className="detail-card">
          <span className="stat-label">Precipitation</span>
          <span className="stat-value">{city.precipitation} mm</span>
        </div>
        <div className="detail-card">
          <span className="stat-label">Time of Day</span>
          <span className="stat-value">{city.isDay ? '☀️ Day' : '🌙 Night'}</span>
        </div>
      </section>

      <section className="chart-card">
        <h2 className="chart-title">{city.name} vs. Global Average</h2>
        <ComparisonChart metrics={metrics} />
      </section>
    </div>
  )
}

export default CityDetail
