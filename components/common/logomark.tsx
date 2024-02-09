import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
}

export function LogoMark({ className }: LogoProps) {
  return (
    <Image
      width={52}
      height={52}
      priority
      alt="Astra logo"
      className={cn('size-28', className)}
      src="/imgs/logomark.png"
    />
  )
}
