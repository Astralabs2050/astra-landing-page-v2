import React from 'react'
import Image from 'next/image'

interface EmptyStateProps {
  text?: React.ReactNode
}

export const EmptyState = ({ text }: EmptyStateProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center space-y-4 py-20">
      <Image
        alt="Empty state"
        src="/imgs/empty-state.png"
        width={139}
        height={139}
        className="size-32"
      />

      {text && <p className="text-base tracking-wide text-gray-3">{text}</p>}
    </div>
  )
}
