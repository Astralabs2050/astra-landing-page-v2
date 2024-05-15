import React from 'react'
import money from '@/public/svgs/Money-Bag.svg'

export default function EarningsPage() {
  return (
    <div>
      <div className="flex items-center">
        <span>Your Earnings</span>
        {/* <img src={money} alt="" className="h-[24px] w-[24px]" /> */}
      </div>
      <p>Here you can view your earnings</p>
      <div>
        <div className="bg-white">
          <p>Total Earnings</p>
          <p>$432,215.32</p>
        </div>
      </div>
    </div>
  )
}
