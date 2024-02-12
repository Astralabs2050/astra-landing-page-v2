import React from 'react'
import Image from 'next/image'
import { Button } from '../ui'
import Kebab from '@/public/svgs/kebab.svg'
import Shirt from '@/public/svgs/shirt.svg'

interface DesignCardProps {
  title: string
  image: string
  hideIcon?: boolean
  tokenhash?: boolean
  subtitle: React.ReactNode
  cta?: React.ReactNode
  tag?: React.ReactNode
}

export const DesignCard = ({
  title,
  image,
  subtitle,
  hideIcon,
  cta,
}: DesignCardProps) => {
  return (
    <div className="overflow-hidden rounded-lg border border-solid border-gray-6 bg-white">
      <Image
        alt={title}
        src={image}
        width={235}
        height={266}
        className="aspect-auto w-full"
      />

      <div className="space-y-4">
        <div className="flex justify-between space-x-4 p-4">
          <div className="max-w-[11rem]">
            <h4 className="mr-3 truncate break-keep text-base font-semibold capitalize">
              {title}
            </h4>
            <div className="flex items-center space-x-1 text-gray-3">
              {!hideIcon && <Shirt className="size-5" />}
              <p className="text-base">{subtitle}</p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="size-6 shrink-0 hover:bg-inherit">
            <Kebab className="size-6 text-blue-1" />
          </Button>
        </div>

        {cta}
      </div>
    </div>
  )
}
