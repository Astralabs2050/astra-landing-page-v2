import React from 'react'
import { Header, Sidebar } from '@/components/common'
import { redirect } from 'next/navigation'
import { getUser } from '@/server/actions/user'

interface DashboardLayoutProps {
  brand: React.ReactNode
  creator: React.ReactNode
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
      <main className="flex min-h-screen w-full grow flex-col">
        <Header user={user} />
        <div className="grid grow grid-cols-[var(--sidebar-width),1fr]">
          <Sidebar user={user} />
          <div className="border-l border-solid border-gray-6  p-10">
            {user?.role === 'BRAND' ? brand : creator}
          </div>
        </div>
      </main>
    </div>
  )
}
