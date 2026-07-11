import { NavLink } from 'react-router-dom'
import { CITIES, slugify } from '../data/cities'

function Sidebar() {
  return (
    <nav className="sidebar">
      <NavLink to="/" className="sidebar-brand" end>
        🌍 Weather Dashboard
      </NavLink>

      <div className="sidebar-section-label">Cities</div>
      <ul className="sidebar-list">
        {CITIES.map((city) => (
          <li key={city.name}>
            <NavLink
              to={`/city/${slugify(city.name)}`}
              className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
            >
              {city.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Sidebar
