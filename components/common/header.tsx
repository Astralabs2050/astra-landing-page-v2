import React from 'react'
import Image from 'next/image'
import { Logo } from '@/components/common'
import { Notifications } from './notifications'
import { AstraBalance } from './astra-balance'
import { User } from '@/types/models'
import { Button } from '../ui'

interface HeaderProps {
  user: NonNullable<User>
}

export function Header({ user }: HeaderProps) {
  return (
    <div className="flex h-[var(--header-height)] items-center justify-between px-12">
      <Logo />

      <div className="flex items-center gap-5">
        <Notifications />
        <AstraBalance />
        {user.role === 'BRAND' ? (
          <Button radii="pill" size="lg">
            Create a new look
          </Button>
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
