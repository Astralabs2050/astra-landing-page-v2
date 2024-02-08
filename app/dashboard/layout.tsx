import React from 'react'
import { Header, Sidebar } from '@/components/common'
import { trpcCaller } from '@/server/utils'
import { redirect } from 'next/navigation'

interface DashboardLayoutProps {
  brand: React.ReactNode
  creator: React.ReactNode
}

async function getUser() {
  const trpc = await trpcCaller()
  const user = await trpc.user.get()

  return user
}

export default async function DashboardLayout({
  brand,
  creator,
}: DashboardLayoutProps) {
  const user = await getUser()

  if (!user?.onboarded) {
    return redirect('/')
  }

  return (
    <div className="flex w-[100vw] flex-col">
      <main className="flex h-screen w-full grow flex-col">
        <Header />
        <div className="grid grow grid-cols-[var(--sidebar-width),1fr] border-t border-solid border-gray-6">
          <Sidebar />
          <div className="border-l border-solid border-gray-6  p-10">
            {user?.role === 'BRAND' ? brand : creator}
          </div>
        </div>
      </main>
    </div>
  )
}
