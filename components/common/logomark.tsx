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
      className={cn('w-28', className)}
      src="https://res.cloudinary.com/kadet/image/upload/v1706869224/astra-lofomark_ocigyd.png"
    />
  )
}
