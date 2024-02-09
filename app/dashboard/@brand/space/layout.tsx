import React, { PropsWithChildren } from 'react'
import CircledArrow from '@/public/svgs/circled-arrow.svg'

export default function SpaceLayout({ children }: PropsWithChildren) {
  return (
    <div className="space-y-10 pt-8">
      <div className="mb-8 flex flex-col items-center justify-center space-y-2">
        <h1 className="text-3xl font-medium">Welcome to your Creative Space</h1>
        <p className=" flex items-center gap-1 text-lg text-gray-3">
          <CircledArrow className="size-5" />
          Design a fashion idea and bring it to life
        </p>
      </div>

      {children}
    </div>
  )
}
