import { Bar, BarChart, CartesianGrid, Cell, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function ComparisonChart({ metrics }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={metrics} layout="vertical" margin={{ top: 8, right: 24, left: 8, bottom: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" horizontal={false} />
        <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 11 }} unit="%" />
        <YAxis type="category" dataKey="label" tick={{ fill: '#e2e8f0', fontSize: 12 }} width={92} />
        <ReferenceLine x={0} stroke="#64748b" />
        <Tooltip
          cursor={{ fill: 'rgba(148, 163, 184, 0.08)' }}
          contentStyle={{ background: '#1e2330', border: '1px solid #2d3748', borderRadius: 8, color: '#e2e8f0' }}
          formatter={(value) => [`${value > 0 ? '+' : ''}${value.toFixed(1)}%`, 'vs. global average']}
        />
        <Bar dataKey="diff" radius={[4, 4, 4, 4]} maxBarSize={22} isAnimationActive={false}>
          {metrics.map((m) => (
            <Cell key={m.key} fill={m.diff >= 0 ? '#f59e0b' : '#38bdf8'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export default ComparisonChart
