'use client'

import React from 'react'
import { useAuth } from '@/providers/auth-provider'

export default function SignIn() {
  const { signIn, signOut, session } = useAuth()

  return (
    <div className="grid h-screen w-screen place-items-center">
      <button onClick={session?.email ? signOut : signIn}>Sign In</button>
    </div>
  )
}
