import { env } from '@/env.mjs'

import { numberToHex } from 'viem'
import { createConfig, configureChains } from 'wagmi'
import { baseGoerli, base } from 'wagmi/chains'
import { CHAIN_NAMESPACES } from '@web3auth/base'
import { jsonRpcProvider } from '@wagmi/core/providers/jsonRpc'
import { Web3AuthConnector } from '@web3auth/web3auth-wagmi-connector'
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider'
import { Web3Auth } from '@web3auth/single-factor-auth'
import { getPublicCompressed } from '@toruslabs/eccrypto'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [baseGoerli, base],
  [
    jsonRpcProvider({
      rpc: chain => ({
        http: chain.rpcUrls.default.http[0],
      }),
    }),
  ],
)

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: numberToHex(baseGoerli.id),
  rpcTarget: baseGoerli.rpcUrls.default.http[0],
  displayName: baseGoerli.name,
  blockExplorer: baseGoerli.blockExplorers.default.url,
  ticker: baseGoerli.nativeCurrency.name,
  tickerName: baseGoerli.name,
}

export const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: {
    chainConfig,
  },
})

export const web3auth = new Web3Auth({
  web3AuthNetwork: 'sapphire_devnet',
  clientId: env.NEXT_PUBLIC_WEB3_CLIENT_ID,
  usePnPKey: false,
})

export const web3authConnector = new Web3AuthConnector({
  chains,
  options: {
    web3AuthInstance: web3auth,
  },
})

export const wagmiConfig = createConfig({
  publicClient,
  webSocketPublicClient,
  autoConnect: false,
  connectors: [web3authConnector],
})

export const parseToken = (token: string) => {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace('-', '+').replace('_', '/')
  return JSON.parse(window.atob(base64 || ''))
}

export const getPublicKey = async () => {
  const app_scoped_privkey = await web3auth.provider?.request({
    method: 'eth_private_key',
  })

  return getPublicCompressed(
    Buffer.from((app_scoped_privkey as string).padStart(64, '0'), 'hex'),
  ).toString('hex')
}
