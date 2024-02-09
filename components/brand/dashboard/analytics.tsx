import React from 'react'
import { Brand } from '@/types/models'

interface AnalyticsProps {
  brand: Brand
}

export const Analytics = ({}: AnalyticsProps) => {
  const stats = [
    {
      title: 'Total Sales',
      value: '$0.00',
    },
    {
      title: 'Total Orders',
      value: '0',
    },
    {
      title: 'Total Earnings',
      value: '$0.00',
    },
  ]

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h2 className="text-xl font-medium">Analytics</h2>
        <p className="flex items-center space-x-1 text-sm text-gray-3">
          <span>Your key stats for the</span>
          <span className="font-medium text-black">last 30 days</span>
        </p>
      </div>

      <div className="grid grid-cols-3 gap-9">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="space-y-3 rounded-xl border border-solid p-4">
            <h4 className="text-sm">{stat.title}</h4>
            <p className="text-3xl font-medium">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
