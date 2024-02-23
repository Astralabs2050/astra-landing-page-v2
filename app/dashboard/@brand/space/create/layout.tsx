import React, { PropsWithChildren } from 'react'
import Link from 'next/link'
import { Logo } from '@/components/common'

export default function CreateLayout({ children }: PropsWithChildren) {
  return (
    <div className="fixed inset-0 z-50 !mt-0 flex flex-col overflow-y-auto bg-neutral-50 px-14 pb-20">
      <div className="flex h-full flex-col">
        <div className="pb-8 pt-12">
          <Link href="/dashboard">
            <Logo />
          </Link>
        </div>

        <div className="mx-20 min-h-64 grow rounded-2xl bg-white px-6 py-10 shadow-none">
          {children}
        </div>
      </div>
    </div>
  )
}
