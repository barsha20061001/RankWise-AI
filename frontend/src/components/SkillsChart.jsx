import{
ResponsiveContainer,
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
CartesianGrid,
}from"recharts";

export default function SkillsChart({skills}){

const chartData=

skills

.slice(0,10)

.map(

([skill,count])=>({

skill,

count,

})

);

return(

<div className="chart-card">

<h2>

Top Trending Skills

</h2>

<ResponsiveContainer
width="100%"
height={420}
>

<BarChart
layout="vertical"
data={chartData}
>

<CartesianGrid stroke="#334155"/>

<XAxis
type="number"
stroke="#94a3b8"
/>

<YAxis

dataKey="skill"

type="category"

stroke="#94a3b8"

width={110}

/>

<Tooltip/>

<Bar

dataKey="count"

fill="#3b82f6"

radius={[0,8,8,0]}

/>

</BarChart>

</ResponsiveContainer>

</div>

);

}