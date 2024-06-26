'use client'

import React, { useState } from 'react'
import { IoReloadSharp } from 'react-icons/io5'
import { LineChartComponent1, LineChartComponent2 } from './index'
import VirtualStore from '@/public/svgs/virtualStore.svg'
import Image from 'next/image'

interface AnalyticsStat {
  id: number
  title: string
  resultNumber: string
  data1: React.ReactNode
}

interface LookData {
  look: string
  sold: number
  tried: number
  image: string | React.ReactNode
  id: string
  price: number
  email: string
}
// example of the dataset coming from backend

const analytics: AnalyticsStat[] = [
  {
    id: 1,
    title: 'Total Outfits sold',
    resultNumber: '3084',
    data1: <LineChartComponent1 />,
  },
  {
    id: 2,
    title: 'Views this month',
    resultNumber: '8235',
    data1: <LineChartComponent2 />,
  },
]

const data: LookData[] = [
  {
    look: 'Urban Ember',
    sold: 2,
    tried: 0,
    image: <VirtualStore />,
    price: 879.89,
    email: 'kronos888@hotmail.com',
    id: '#AST12345',
  },
  {
    look: 'Metropolitan State',
    sold: 2,
    tried: 1,
    image: <VirtualStore />,
    price: 879.89,
    email: 'kronos888@hotmail.com',
    id: '#AST12346',
  },
  {
    look: 'Cyber-Physical Fashion NFTs',
    sold: 2,
    tried: 1,
    image: <VirtualStore />,
    price: 879.89,
    email: 'kronos888@hotmail.com',
    id: '#AST12347',
  },
  {
    look: 'Cyber-Physical Fashion NFTs',
    sold: 2,
    tried: 0,
    image: <VirtualStore />,
    price: 879.89,
    email: 'kronos888@hotmail.com',
    id: '#AST12348',
  },
]

export default function Store() {
  const [loading, setLoading] = useState(false)

  const handleReload = () => {
    setLoading(true)
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }

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
              className="flex w-[347px] rounded-[10px] border p-[20px]">
              <div>
                <p className="mb-[20px] text-[14px]">{stat.title}</p>
                <p className="text-[32px] font-[600]">{stat.resultNumber}</p>
              </div>
              <div className="mt-[43px] h-[50px] w-[250px]">{stat.data1}</div>
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
          </select>
          <select className="flex h-[56px] w-[180px] items-center justify-center rounded-[5px] border px-[20px] outline-none">
            <option>This Month</option>
            <option>This Week</option>
          </select>
        </div>

        <button
          onClick={handleReload}
          className="flex items-center justify-center gap-[12px] rounded-[12px] border px-[20px]">
          {loading ? (
            <div className=" flex items-center gap-[10px]" role="status">
              <span className="visually-hidden flex size-4 animate-spin">
                <IoReloadSharp />
              </span>
              Refresh
            </div>
          ) : (
            <>Refresh</>
          )}
        </button>
      </div>

      <table className="m-auto mt-[60px] w-[85%] leading-normal">
        <thead>
          <tr>
            <th className="border-b-2 border-gray-200 px-5 py-3 text-left text-xs font-semibold tracking-wider text-gray-600">
              Outfit ID
            </th>
            <th className="border-b-2 border-gray-200 px-5 py-3 text-left text-xs font-semibold tracking-wider text-gray-600">
              Name of outfit
            </th>
            <th className="border-b-2 border-gray-200 px-5 py-3 text-left text-xs font-semibold tracking-wider text-gray-600">
              Outfit Price (ASTRAS)
            </th>
            <th className="border-b-2 border-gray-200 px-5 py-3 text-left text-xs font-semibold tracking-wider text-gray-600">
              User Email
            </th>
            <th className="border-b-2 border-gray-200 px-5 py-3 text-left text-xs font-semibold tracking-wider text-gray-600">
              Try on count
            </th>
            <th className="border-b-2 border-gray-200 px-5 py-3 text-left text-xs font-semibold tracking-wider text-gray-600">
              Buy count
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="border-b border-gray-200 bg-white p-5 text-sm">
                {item.id}
              </td>
              <td className="border-b border-gray-200 bg-white p-5 text-sm">
                <div className="flex items-center gap-[20px]">
                  {typeof item.image === 'string' ? (
                    <Image
                      src={item.image}
                      alt="image"
                      className="size-[50px] object-cover"
                      width={50}
                      height={50}
                    />
                  ) : (
                    <div className="size-[50px]">{item.image}</div>
                  )}
                  <div>
                    <p>{item.look}</p>
                    <p>No. of Pieces: 3 pieces</p>
                  </div>
                </div>
              </td>
              <td className="border-b border-gray-200 bg-white p-5 text-sm">
                {item.price}
              </td>
              <td className="border-b border-gray-200 bg-white p-5 text-sm">
                {item.email}
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
