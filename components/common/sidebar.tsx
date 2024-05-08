'use client'

import { routes } from '@/constants/dashboard-routes'
import { cn } from '@/lib/utils'
import { User } from '@/types/models'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface SidebarProps {
  user: NonNullable<User>
}

export function Sidebar({ user }: SidebarProps) {
  const nav = routes[user.role]
  const pathname = usePathname()

  console.log('User Role:', user.role)
  console.log('Navigation routes:', nav)

  return (
    <aside className="w-full px-4 py-14">
      <nav className="sticky top-[calc(var(--header-height)+3.5rem)]">
        <ul className="grid gap-[0.9rem]">
          {nav.map(({ path, title, Icon }, index) => (
            <li key={index}>
              <Link
                href={path}
                className={cn(
                  'group flex items-center gap-4 rounded-lg px-6 py-4 text-gray-2 transition-all duration-200 hover:pl-8 hover:text-black',
                  {
                    'pointer-events-none bg-black text-white hover:text-white':
                      index === 0 ? pathname === path : pathname.includes(path),
                  },
                )}>
                <Icon className="size-5" />
                <span>{title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
