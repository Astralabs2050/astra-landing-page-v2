'use client'

import React, { Fragment } from 'react'
import { useAuth } from '@/providers/auth-provider'
import { GoogleLogin } from '@react-oauth/google'

export default function SignIn() {
  const { signIn, signOut } = useAuth()

  return (
    <Fragment>
      <div className="flex h-screen w-screen flex-col items-center justify-center">
        <GoogleLogin onSuccess={signIn} />
        <button className="h-12 w-60 rounded-lg bg-green-500" onClick={signOut}>
          Sign Out
        </button>
      </div>
    </Fragment>
  )
}
