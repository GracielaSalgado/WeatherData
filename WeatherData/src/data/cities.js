export const CITIES = [
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

export function slugify(name) {
  return name.toLowerCase().replace(/\s+/g, '-')
}

export function getCondition(code) {
  if (code === 0) return 'Clear'
  if (code <= 3) return 'Cloudy'
  if (code <= 48) return 'Foggy'
  if (code <= 67) return 'Rainy'
  if (code <= 77) return 'Snowy'
  if (code <= 86) return 'Rainy'
  return 'Stormy'
}

export function getConditionEmoji(condition) {
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

// Fixed draw order for the condition categories — never re-sorted by count,
// so a color always means the same condition across renders.
export const CONDITION_ORDER = ['Clear', 'Cloudy', 'Foggy', 'Rainy', 'Snowy', 'Stormy']

export const CONDITION_COLORS = {
  Clear:  '#3987e5',
  Cloudy: '#199e70',
  Foggy:  '#c98500',
  Rainy:  '#9085e9',
  Snowy:  '#008300',
  Stormy: '#e66767',
}

const COMPASS_POINTS = [
  'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
  'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW',
]

export function degreesToCompass(deg) {
  const index = Math.round(deg / 22.5) % 16
  return `${COMPASS_POINTS[index]} (${Math.round(deg)}°)`
}
