import { env } from '@/env.mjs'
import { Web3AuthNoModal } from '@web3auth/no-modal'
import { CHAIN_NAMESPACES } from '@web3auth/base'
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider'
import { OpenloginAdapter } from '@web3auth/openlogin-adapter'
import { polygonMumbai } from 'viem/chains'
import { numberToHex } from 'viem'

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: numberToHex(polygonMumbai.id),
  rpcTarget: polygonMumbai.rpcUrls.default.http[0],
  displayName: polygonMumbai.name,
  blockExplorer: polygonMumbai.blockExplorers.default.url,
  ticker: polygonMumbai.nativeCurrency.name,
  tickerName: polygonMumbai.name,
}

export const web3auth = new Web3AuthNoModal({
  clientId: env.NEXT_PUBLIC_WEB3_CLIENT_ID,
  chainConfig,
  web3AuthNetwork: 'sapphire_devnet',
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
      appName: 'Astra',
      appUrl: 'http://localhost:3000',
      logoLight: 'https://web3auth.io/images/web3auth-logo.svg',
      logoDark: 'https://web3auth.io/images/web3auth-logo---Dark.svg',
      defaultLanguage: 'en',
      mode: 'light',
      theme: {
        primary: '#000000',
      },
      useLogoLoader: true,
    },
  },
  privateKeyProvider,
})

web3auth.configureAdapter(openloginAdapter)
