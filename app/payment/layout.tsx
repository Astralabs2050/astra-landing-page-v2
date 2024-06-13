import React, { PropsWithChildren } from 'react'
import { Header } from '@/components/common'
import { redirect } from 'next/navigation'
import { getUser } from '@/server/actions/user'

export default async function PaymentLayout({ children }: PropsWithChildren) {
  const user = await getUser()

  if (!user?.onboarded) {
    return redirect('/')
  }

  return (
    <div className="flex w-screen flex-col">
      <main className="flex min-h-screen w-full grow flex-col">
        <Header user={user} />
        <div className="m-auto flex items-center justify-center">
          {children}
        </div>
      </main>
    </div>
  )
}
