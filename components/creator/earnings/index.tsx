import React from 'react'

import Money from '@/public/svgs/Money-Bag.svg'
import Dollars from '@/public/svgs/e-dollars.svg'
import Job from '@/public/svgs/e-jobs.svg'

const data = [
  {
    date: 'Summer Outfit',
    desc: 'Turn Fashion Images to 3D',
    brand: 'AI Fashion',
    status: 'pending',
    Amount: 100,
    payment: '-',
  },
  {
    date: 'Summer Outfit',
    desc: 'Turn Fashion Images to 3D',
    brand: 'AI Fashion',
    status: 'completed',
    Amount: 100,
    payment: 'paid',
  },
]

export default function EarningsPage() {
  return (
    <div className="px-[50px]">
      <div className="flex items-center gap-[15px]">
        <span className="text-[30px] font-[600]">Your Earnings</span>
        <Money className="size-[24px]" />
      </div>
      <p className="mb-[50px]  font-[400]">Here you can view your earnings</p>
      <div className="flex gap-[40px]">
        <div className="flex h-[205px] w-[234px] flex-col gap-[15px] rounded-[15px] border bg-[#F8F8F8] p-[20px]">
          <Dollars className="size-[42px]" />
          <p className="font-[400]">Total Earnings</p>
          <p className="text-[24px] font-[500]">$432,215.32</p>
          <p>date</p>
        </div>
        <div className="flex h-[205px] w-[234px] flex-col gap-[15px] rounded-[15px] border bg-[#F8F8F8] p-[20px]">
          <Job className="size-[42px]" />
          <p className="font-[400]">Total Jobs Completed</p>
          <p className="text-[24px] font-[500]">10</p>
          <p>date</p>
        </div>
      </div>
      <div>
        <p className="text-[25px] font-[600]">Recent Activities</p>
        <table className="m-auto mt-[60px] min-w-full leading-normal">
          <thead>
            <tr>
              <th className="border-b-2 border-gray-200 px-5 py-3 text-left text-xs font-semibold tracking-wider text-gray-600">
                Timestamp
              </th>
              <th className="border-b-2 border-gray-200 px-5 py-3 text-left text-xs font-semibold tracking-wider text-gray-600">
                Description
              </th>
              <th className="border-b-2 border-gray-200 px-5 py-3 text-left text-xs font-semibold tracking-wider text-gray-600">
                Brand Name
              </th>
              <th className="border-b-2 border-gray-200 px-5 py-3 text-left text-xs font-semibold tracking-wider text-gray-600">
                Status
              </th>
              <th className="border-b-2 border-gray-200 px-5 py-3 text-left text-xs font-semibold tracking-wider text-gray-600">
                Amount
              </th>
              <th className="border-b-2 border-gray-200 px-5 py-3 text-left text-xs font-semibold tracking-wider text-gray-600">
                Payment Status
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className="border-b border-gray-200 bg-white p-5 text-sm">
                  <p>{item.date}</p>
                </td>
                <td className="border-b border-gray-200 bg-white p-5 text-sm">
                  {item.desc}
                </td>
                <td className="border-b border-gray-200 bg-white p-5 text-sm">
                  {item.brand}
                </td>
                <td className="border-b border-gray-200 bg-white p-5 text-sm">
                  {item.status}
                </td>
                <td className="border-b border-gray-200 bg-white p-5 text-sm">
                  ${item.Amount}
                </td>
                <td className="border-b border-gray-200 bg-white p-5 text-sm">
                  {item.payment}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
