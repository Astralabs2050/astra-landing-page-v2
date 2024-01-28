'use client'

import React from 'react'
import { AuthProvider } from './auth-provider'
import { TrpcProvider } from './trpc-provider'
import { PropsWithChildren } from 'react'
import { WagmiProvider } from './wagmi-provider'
import { OauthProvider } from './oauth-provider'

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <WagmiProvider>
      <TrpcProvider>
        <OauthProvider>
          <AuthProvider>{children}</AuthProvider>
        </OauthProvider>
      </TrpcProvider>
    </WagmiProvider>
  )
}
