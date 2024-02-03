import React from 'react'
import Link from 'next/link'
import { Logo } from '@/components/shared'
import { routes } from '@/constants/app-routes'

export function Header() {
  return (
    <div className="flex h-[var(--header-height)] items-center justify-between px-6">
      <Logo />
      <Link href={routes.logout}>
        <button className="h-10 rounded-md bg-black px-8 font-medium text-white">
          Sign Out
        </button>
      </Link>
    </div>
  )
}
