'use client'

import React from 'react'
import { Logo } from '.'
import Image from 'next/image'
import { Button } from '../ui'

interface NoticeProps {
  title: string
  subtitle: string
  cta: {
    text: string
    action: () => void
  }
}

export const Notice = ({ title, subtitle, cta }: NoticeProps) => {
  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-gray-6">
      <div className="grid w-[31rem] gap-7 rounded-2xl bg-white p-6">
        <div className="relative grid h-56 w-full place-items-center overflow-hidden rounded-lg bg-center">
          <Logo className="absolute m-auto w-[20rem]" />
          <Image
            alt="welcome banner"
            src="/imgs/creator-welcome.png"
            width={904}
            height={458}
            quality={100}
            className="size-full"
          />
        </div>

        <div className="grid gap-3">
          <h3 className="text-xl font-medium">{title}</h3>
          <p>{subtitle}</p>
        </div>

        <Button size="lg" className="w-full rounded-full" onClick={cta.action}>
          {cta.text}
        </Button>
      </div>
    </div>
  )
}
