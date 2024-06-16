'use client'

import React from 'react'
import Image from 'next/image'
import { api } from '@/services/trpc-client'
import { cn } from '@/lib/utils'
import { Spinner } from '../ui'
import type { Role } from '@prisma/client'
import { useRouter } from 'next/navigation'

interface RoleProps {
  index: number
  role: Role
}

export function Role({ role, index }: RoleProps) {
  const { refresh } = useRouter()
  const { mutateAsync, isLoading } = api.user.create.useMutation()

  async function assignRole() {
    mutateAsync({ role: role.id }).then(() => {
      refresh()
    })
  }

  return (
    <div className="relative overflow-hidden rounded-lg">
      <div
        role="button"
        tabIndex={0}
        onClick={assignRole}
        className={cn(
          'cursor-pointer space-y-8 rounded-lg border border-solid border-gray-6 p-4 py-16 text-center transition-all hover:bg-gray-6 focus:border-black focus:bg-gray-6',
          {
            'pointer-events-none opacity-50': isLoading,
          },
        )}>
        <Image
          alt={role.title}
          width={88}
          height={88}
          className="mx-auto size-[5.5rem] rounded-full object-cover object-center"
          src={`/imgs/role-${index + 1}.png`}
        />
        <div className="space-y-1">
          <h3 className="text-xl font-medium">{role.title}</h3>
          <p className="text-gray-3">{role.description}</p>
        </div>
      </div>

      {isLoading && (
        <Spinner
          className="absolute right-5 top-4 h-fit"
          spinnerClass="w-5 h-5"
        />
      )}
    </div>
  )
}
