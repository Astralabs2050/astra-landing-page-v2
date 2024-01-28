import { env } from '@/env.mjs'

import { CHAIN_NAMESPACES } from '@web3auth/base'
import { Web3AuthNoModal } from '@web3auth/no-modal'
import { OpenloginAdapter } from '@web3auth/openlogin-adapter'
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider'
import { Web3AuthConnector } from '@web3auth/web3auth-wagmi-connector'

import { numberToHex } from 'viem'
import { createConfig, configureChains } from 'wagmi'
import { baseGoerli, base } from 'wagmi/chains'
import { jsonRpcProvider } from '@wagmi/core/providers/jsonRpc'

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

export const web3auth = new Web3AuthNoModal({
  chainConfig,
  web3AuthNetwork: 'sapphire_devnet',
  clientId: env.NEXT_PUBLIC_WEB3_CLIENT_ID,
})

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: {
    chainConfig,
  },
})

const openloginAdapter = new OpenloginAdapter({
  adapterSettings: {
    uxMode: 'popup',
    whiteLabel: {
      useLogoLoader: false,
      appName: 'Astra',
      appUrl: 'http://localhost:3000',
      logoLight: 'https://web3auth.io/images/web3auth-logo.svg',
      logoDark: 'https://web3auth.io/images/web3auth-logo---Dark.svg',
      defaultLanguage: 'en',
      mode: 'light',
      theme: {
        primary: '#000000',
      },
    },
  },
  privateKeyProvider,
})

web3auth.configureAdapter(openloginAdapter)

export const web3authConnector = new Web3AuthConnector({
  chains,
  options: {
    web3AuthInstance: web3auth,
    loginParams: {
      loginProvider: 'google',
    },
  },
})

export const wagmiConfig = createConfig({
  publicClient,
  webSocketPublicClient,
  autoConnect: false,
  connectors: [web3authConnector],
})
