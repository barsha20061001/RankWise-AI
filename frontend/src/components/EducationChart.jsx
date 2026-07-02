import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS=[
"#06b6d4",
"#3b82f6",
"#8b5cf6",
"#22c55e",
"#f59e0b",
"#ef4444",
"#14b8a6",
"#6366f1"
];

export default function EducationChart({data}){

const chartData=

Object.entries(data).map(

([degree,count])=>({

degree,

count,

})

);

return(

<div className="chart-card">

<h2>

Education Distribution

</h2>

<ResponsiveContainer
width="100%"
height={350}
>

<PieChart>

<Pie

data={chartData}

dataKey="count"

nameKey="degree"

outerRadius={120}

label

>

{

chartData.map((_,index)=>(

<Cell

key={index}

fill={

COLORS[index%

COLORS.length]

}

/>

))

}

</Pie>

<Tooltip/>

<Legend/>

</PieChart>

</ResponsiveContainer>

</div>

);

}