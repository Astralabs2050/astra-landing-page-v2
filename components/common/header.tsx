import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Logo } from '@/components/common'
import { Notifications } from './notifications'
import { AstraBalance } from './astra-balance'
import { User } from '@/types/models'
import { Button } from '../ui'
import { routes } from '@/constants/app-routes'

interface HeaderProps {
  user: NonNullable<User>
}

export function Header({ user }: HeaderProps) {
  return (
    <div className="sticky top-0 z-40 flex h-[var(--header-height)] shrink-0 items-center justify-between border-b border-solid border-gray-6 bg-white px-12">
      <Logo />

      <div className="flex items-center gap-5">
        <Notifications />
        <AstraBalance />
        {user.role === 'BRAND' ? (
          <Link href={routes.dashboard.space}>
            <Button radii="pill" size="lg">
              Create a new look
            </Button>
          </Link>
        ) : (
          <Image
            alt={user.fullname}
            src={user.avatar}
            width={512}
            height={512}
            className="size-12 rounded-full"
          />
        )}
      </div>
    </div>
  )
}
