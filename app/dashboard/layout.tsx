import React, { PropsWithChildren } from 'react'
import { Header, Sidebar } from '@/components/layout'

export default function BrandLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex w-[100vw] flex-col">
      <main className="flex h-screen w-full flex-grow flex-col">
        <Header />
        <div className="grid grow grid-cols-[var(--sidebar-width),1fr] border-t border-solid border-gray-6">
          <Sidebar />
          <div className="border-l border-solid border-gray-6  p-10">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
