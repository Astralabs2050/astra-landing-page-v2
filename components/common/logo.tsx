import React from 'react'
import Image from 'next/image'
import { clsxm } from '@/lib/clsxm'

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <Image
      width={155}
      height={37}
      priority
      alt="Astra logo"
      className={clsxm('w-[9.69rem]', className)}
      src="https://res.cloudinary.com/kadet/image/upload/v1706456259/ASTRA_NEW_LOGO_5_1_aqppqf.png"
    />
  )
}
