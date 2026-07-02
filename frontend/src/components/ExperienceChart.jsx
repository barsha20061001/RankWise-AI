import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function ExperienceChart({ data }) {

  const chartData = Object.entries(data).map(
    ([level, count]) => ({
      level,
      count,
    })
  );

  return (

    <div className="chart-card">

      <h2>Experience Distribution</h2>

      <ResponsiveContainer
        width="100%"
        height={320}
      >

        <BarChart data={chartData}>

          <CartesianGrid stroke="#334155" />

          <XAxis
            dataKey="level"
            stroke="#94a3b8"
          />

          <YAxis stroke="#94a3b8" />

          <Tooltip />

          <Bar
            dataKey="count"
            fill="#06b6d4"
            radius={[8,8,0,0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

}