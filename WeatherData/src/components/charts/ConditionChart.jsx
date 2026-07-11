import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { CONDITION_COLORS, CONDITION_ORDER } from '../../data/cities'

function ConditionChart({ data }) {
  const counts = CONDITION_ORDER
    .map((condition) => ({
      condition,
      count: data.filter((c) => c.condition === condition).length,
    }))
    .filter((entry) => entry.count > 0)

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={counts}
          dataKey="count"
          nameKey="condition"
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={90}
          paddingAngle={2}
          isAnimationActive={false}
        >
          {counts.map((entry) => (
            <Cell key={entry.condition} fill={CONDITION_COLORS[entry.condition]} stroke="#1e2330" strokeWidth={2} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ background: '#1e2330', border: '1px solid #2d3748', borderRadius: 8, color: '#e2e8f0' }}
          formatter={(value, name) => [`${value} cit${value === 1 ? 'y' : 'ies'}`, name]}
        />
        <Legend
          verticalAlign="bottom"
          height={36}
          formatter={(value) => <span style={{ color: '#94a3b8', fontSize: 12 }}>{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default ConditionChart
