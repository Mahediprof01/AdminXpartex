"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

const data = [
  { name: "Jan", revenue: 4000, orders: 240, profit: 2400 },
  { name: "Feb", revenue: 3000, orders: 139, profit: 2210 },
  { name: "Mar", revenue: 2000, orders: 980, profit: 2290 },
  { name: "Apr", revenue: 2780, orders: 390, profit: 2000 },
  { name: "May", revenue: 1890, orders: 480, profit: 2181 },
  { name: "Jun", revenue: 2390, orders: 380, profit: 2500 },
  { name: "Jul", revenue: 3490, orders: 430, profit: 2100 },
  { name: "Aug", revenue: 4000, orders: 240, profit: 2400 },
  { name: "Sep", revenue: 3000, orders: 139, profit: 2210 },
  { name: "Oct", revenue: 2000, orders: 980, profit: 2290 },
  { name: "Nov", revenue: 2780, orders: 390, profit: 2000 },
  { name: "Dec", revenue: 1890, orders: 480, profit: 2181 },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          }}
        />
        <Legend />
        <Bar dataKey="revenue" fill="url(#revenueGradient)" radius={[4, 4, 0, 0]} name="Revenue" />
        <Bar dataKey="profit" fill="url(#profitGradient)" radius={[4, 4, 0, 0]} name="Profit" />
        <defs>
          <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.3} />
          </linearGradient>
          <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.3} />
          </linearGradient>
        </defs>
      </BarChart>
    </ResponsiveContainer>
  )
}
