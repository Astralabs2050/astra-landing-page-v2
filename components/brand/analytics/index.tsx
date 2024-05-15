'use client' // Add this directive at the top

import React, { PureComponent } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const data1 = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 8400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 8210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 8290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 8000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 8181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 8500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 8100 },
]
const data2 = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
]

export class LineChartComponent1 extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="100%" height={100}>
        <LineChart
          data={data1}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="hidden" />
          <XAxis dataKey="name" className="hidden" />
          <YAxis className="hidden" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    )
  }
}

export class LineChartComponent2 extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="100%" height={100}>
        <LineChart
          data={data2}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="hidden" />
          <XAxis dataKey="name" className="hidden" />
          <YAxis className="hidden" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    )
  }
}
