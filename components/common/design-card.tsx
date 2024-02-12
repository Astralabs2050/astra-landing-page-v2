import React, { Fragment } from 'react'
import Image from 'next/image'
import Kebab from '@/public/svgs/kebab.svg'
import Shirt from '@/public/svgs/shirt.svg'
import ShirtFolded from '@/public/svgs/shirt-folded.svg'
import Trash from '@/public/svgs/trash.svg'
import Cube from '@/public/svgs/cube.svg'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui'
import { Design } from '@/types/models'

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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative size-6 shrink-0 hover:bg-inherit">
                <Kebab className="size-6 text-blue-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              {menuContent}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {cta}
      </div>
    </div>
  )
}

export const DesignCardMenu = ({}: Design) => {
  return (
    <Fragment>
      <DropdownMenuItem>
        <Cube className="mr-2 size-5" />
        <span>Turn to 3D</span>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <ShirtFolded className="mr-2 size-5" />
        <span>Make it Real</span>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="text-destructive focus:bg-destructive focus:text-white">
        <Trash className="mr-2 size-5" />
        <span>Delete</span>
      </DropdownMenuItem>
    </Fragment>
  )
}
