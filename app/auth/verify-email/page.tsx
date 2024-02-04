import { LogoMark } from '@/components/common'
import { routes } from '@/constants/app-routes'
import Link from 'next/link'
import React from 'react'

export default function VerifyEmail() {
  return (
    <div className="-mt-14 flex h-screen flex-col items-center justify-center space-y-8">
      <LogoMark />

      <div className="flex flex-col gap-2">
        <h1 className="text-center text-3xl font-medium">Email Verification</h1>
        <p className="text-center text-lg">
          We have sent a verification link to your email address please <br />
          check your inbox to continue{' '}
          <Link href={routes.login} className="font-medium underline">
            Wrong Email?
          </Link>
        </p>
      </div>
    </div>
  )
}
