'use client'

import React from 'react'
import { useAuth } from '@/providers/auth-provider'

export default function SignIn() {
  const { signIn } = useAuth()

  return (
    <div className="grid h-screen w-screen place-items-center">
      <button onClick={signIn}>Sign In</button>
    </div>
  )
}
