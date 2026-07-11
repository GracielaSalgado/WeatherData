import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function TemperatureChart({ data }) {
  const sorted = [...data].sort((a, b) => b.temp - a.temp)

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={sorted} margin={{ top: 8, right: 8, left: -20, bottom: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" vertical={false} />
        <XAxis
          dataKey="name"
          tick={{ fill: '#94a3b8', fontSize: 11 }}
          interval={0}
          angle={-35}
          textAnchor="end"
          height={56}
        />
        <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} unit="°" />
        <Tooltip
          cursor={{ fill: 'rgba(125, 211, 252, 0.08)' }}
          contentStyle={{ background: '#1e2330', border: '1px solid #2d3748', borderRadius: 8, color: '#e2e8f0' }}
          labelStyle={{ color: '#f8fafc' }}
          formatter={(value) => [`${value}°C`, 'Temperature']}
        />
        <Bar dataKey="temp" fill="#7dd3fc" radius={[6, 6, 0, 0]} maxBarSize={26} isAnimationActive={false} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default TemperatureChart
