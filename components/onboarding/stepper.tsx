import React from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
interface StepperProps {
  count: number
  current: number
}

export const Stepper = ({ count, current }: StepperProps) => {
  return (
    <div className="relative">
      <div className="relative z-10 flex items-center space-x-[3.75rem]">
        {Array.from(Array(count).keys()).map((item, index) => (
          <span
            key={index}
            className={cn(
              'grid size-10 place-items-center rounded-full border border-solid border-gray-5 bg-white',
              {
                'border-blue-1 bg-blue-1 text-white': current >= item + 1,
              },
            )}>
            {current > item + 1 ? <Check className="size-4" /> : item + 1}
          </span>
        ))}
      </div>
      <div className="absolute inset-0 mx-0 my-auto h-[1px] bg-gray-5" />
    </div>
  )
}
