import { wagmiConfig } from '@/lib/web3auth'
import { PropsWithChildren } from 'react'
import { WagmiConfig } from 'wagmi'

export const WagmiProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
}
