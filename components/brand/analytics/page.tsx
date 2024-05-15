'use client' // Add this directive at the top

import React from 'react'
import { IoReloadSharp } from 'react-icons/io5'
import LineChartComponent from './index' // Adjusted import path

interface AnalyticsStat {
  id: number
  title: string
  resultNumber: string
}

interface LookData {
  look: string
  sold: number
  tried: number
}

const analytics: AnalyticsStat[] = [
  {
    id: 1,
    title: 'Total Outfits sold',
    resultNumber: '3084',
  },
  {
    id: 2,
    title: 'Views this month',
    resultNumber: '8235',
  },
]

const data: LookData[] = [
  { look: 'Summer Outfit', sold: 150, tried: 45 },
  { look: 'Winter Jacket', sold: 90, tried: 35 },
  { look: 'Spring Dress', sold: 200, tried: 60 },
  { look: 'Autumn Boots', sold: 70, tried: 25 },
]

export default function BrandAnalytics() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <p className="text-[32px] font-[600]">Analytics</p>
        <p className="text-[18px]">
          Get an idea of how well your looks are doing in Astra
        </p>
      </div>

      <div className="mt-[60px] flex items-center justify-center gap-[40px]">
        <div className="flex gap-[40px]">
          {analytics.map(stat => (
            <div
              key={stat.id}
              className="flex w-[347px] flex-col justify-between rounded-[10px] border p-[30px]">
              <div>
                <p className="mb-[20px]">{stat.title}</p>
                <p className="text-[32px] font-[600]">{stat.resultNumber}</p>
              </div>
              <div className="mt-[20px] h-[200px]">
                <LineChartComponent />
              </div>
            </div>
          ))}
        </div>
        <div className="h-[69px] w-[232px]">
          <p className="text-[16px] text-[#828282]">Insights:</p>
          <p className="text-[14px]">
            During this 30 day period, you earned <b>428 impressions</b> per day
          </p>
        </div>
      </div>

      <div className="mx-[90px] mt-[50px] flex justify-between">
        <div className="flex gap-[30px]">
          <select className="flex h-[56px] w-[180px] items-center justify-center rounded-[5px] border px-[20px] outline-none">
            <option>Most tried on</option>
            <option>ghhgh</option>
          </select>
          <select className="flex h-[56px] w-[180px] items-center justify-center rounded-[5px] border px-[20px] outline-none">
            <option>This Month</option>
            <option>This Week</option>
          </select>
        </div>

        <button className="flex items-center justify-center gap-[12px] rounded-[12px] border px-[20px]">
          <IoReloadSharp />
          Refresh
        </button>
      </div>

      <table className="m-auto mt-[60px] w-[85%] leading-normal">
        <thead>
          <tr>
            <th className="border-b-2 border-gray-200 px-5 py-3 text-left text-xs font-semibold tracking-wider text-gray-600">
              Uploaded Look
            </th>
            <th className="border-b-2 border-gray-200 px-5 py-3 text-left text-xs font-semibold tracking-wider text-gray-600">
              No. of Pieces Sold
            </th>
            <th className="border-b-2 border-gray-200 px-5 py-3 text-left text-xs font-semibold tracking-wider text-gray-600">
              No. of Times Tried On
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="border-b border-gray-200 bg-white p-5 text-sm">
                <div className="flex items-center gap-[20px]">
                  {/* Placeholder image, replace with actual image source */}
                  <img
                    src="#"
                    alt="image"
                    className="size-[50px] object-cover"
                  />
                  <div>
                    <p>{item.look}</p>
                    <p>No. of Pieces: 3 pieces</p>
                  </div>
                </div>
              </td>
              <td className="border-b border-gray-200 bg-white p-5 text-sm">
                {item.sold}
              </td>
              <td className="border-b border-gray-200 bg-white p-5 text-sm">
                {item.tried}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
