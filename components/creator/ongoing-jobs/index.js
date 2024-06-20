import React from 'react'
import Laptop from '@/public/svgs/Laptop.svg'
import RedCircle from '@/public/svgs/RedCircle.svg'
import Menu from '@/public/svgs/menu.svg'

export default function OngoingJobsPage() {
  return (
    <div className="p-4">
      <div className="mb-4">
        <div className="flex items-center gap-4">
          <span className="text-3xl font-semibold">Your Ongoing Jobs</span>
          <Laptop />
        </div>
        <p className="text-lg">Your current ongoing jobs are here.</p>
      </div>
      <div className="mt-16 flex gap-14 text-gray-2">
        <span className="flex h-12 w-[366px] cursor-pointer items-center justify-center rounded-full px-5  hover:bg-gray-6 hover:text-black">
          Ongoing Jobs
        </span>
        <span className="flex h-12 w-[366px] cursor-pointer items-center justify-center rounded-full px-5  hover:bg-gray-6 hover:text-black">
          Completed
        </span>
        <span className="flex h-12 w-[366px] cursor-pointer items-center justify-center rounded-full px-5  hover:bg-gray-6 hover:text-black">
          All Jobs
        </span>
        <span className="flex h-12 w-[366px] cursor-pointer items-center justify-center rounded-full px-5  hover:bg-gray-6 hover:text-black">
          My Applications
        </span>
      </div>
      <hr className="my-4" />
      <div className="flex items-center">
        <div className="flex h-64 w-80 flex-col gap-4 rounded-lg border p-4">
          <div className="flex justify-between">
            <p className="text-[#1D40C8]">Yesterday</p>
            <p>
              <Menu />
            </p>
          </div>
          <p className="text-lg">Turn Fashion Images to 3D</p>
          <p className="font-normal text-gray-2">
            AXL Fashion Fit (Name of Brand)
          </p>
          <hr />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[13px]">Expected Delivery Date:</p>
              <p className="font-[500]">Oct 9, 2023 11:46 AM</p>
            </div>
            <div>
              <RedCircle />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
