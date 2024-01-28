'use client'

import { useAuth } from '@/providers/auth-provider'
import React from 'react'
import { createWalletClient, custom } from 'viem'

export default function SignIn() {
  const { signIn, web3auth } = useAuth()

  React.useEffect(() => {
    if (!web3auth.provider) {
      return
    }

    const client = createWalletClient({
      transport: custom(web3auth.provider),
    })

    client.getAddresses().then(add => {
      console.log(add, '>>>>')
    })

    client.getChainId().then(add => {
      console.log(add, '>>>>')
    })
  }, [web3auth.connected, web3auth.provider])

  return (
    <div className="grid h-screen w-screen place-items-center">
      <button onClick={signIn}>Sign In</button>
    </div>
  )
}
