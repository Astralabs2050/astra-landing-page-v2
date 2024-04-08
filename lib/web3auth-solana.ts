import { env } from '@/env.mjs'

import { CHAIN_NAMESPACES } from '@web3auth/base'
import { Web3Auth } from '@web3auth/single-factor-auth'
import { SolanaPrivateKeyProvider } from '@web3auth/solana-provider'

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.SOLANA,
  chainId: '0x3',
  rpcTarget: 'https://api.devnet.solana.com',
  displayName: 'Solana Devnet',
  blockExplorer: 'https://explorer.solana.com',
  ticker: 'SOL',
  tickerName: 'Solana',
}

export const privateKeyProvider = new SolanaPrivateKeyProvider({
  config: {
    chainConfig,
  },
})

export const web3auth = new Web3Auth({
  web3AuthNetwork: 'sapphire_devnet',
  clientId: env.NEXT_PUBLIC_WEB3_CLIENT_ID,
  usePnPKey: false,
})
