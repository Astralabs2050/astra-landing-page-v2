import React from 'react'
import Image from 'next/image'
import Kebab from '@/public/svgs/kebab.svg'
import Shirt from '@/public/svgs/shirt.svg'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui'

interface DesignCardProps {
  title: string
  image: string
  hideIcon?: boolean
  tokenhash?: boolean
  subtitle: React.ReactNode
  cta?: React.ReactNode
  tag?: React.ReactNode
  menuContent?: React.ReactNode
}

export const DesignCard = ({
  title,
  image,
  subtitle,
  hideIcon,
  cta,
  menuContent,
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

      <div className="space-y-4 p-4">
        <div className="flex justify-between space-x-4">
          <div className="max-w-[11rem]">
            <h4 className="mr-3 truncate break-keep text-base font-semibold capitalize">
              {title}
            </h4>
            <div className="flex items-center text-base text-gray-3">
              {!hideIcon && <Shirt className="mr-1 size-5" />}
              {subtitle}
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative size-6 shrink-0 hover:bg-inherit">
                <Kebab className="size-6 text-blue-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-40">
              {menuContent}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {cta}
      </div>
    </div>
  )
}
