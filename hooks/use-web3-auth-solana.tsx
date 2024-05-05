/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react'
import { privateKeyProvider, web3auth } from '@/lib/web3auth-solana'
import { parseToken } from '@/lib/web3auth'
import { ADAPTER_EVENTS } from '@web3auth/base'
import { $auth } from '@/store/auth'
import { useStore } from '@nanostores/react'
import { useUser } from '@auth0/nextjs-auth0/client'
import { usePathname, useRouter } from 'next/navigation'
import { routes } from '@/constants/app-routes'
import { api } from '@/services/trpc-client'
import { SolanaWallet } from '@web3auth/solana-provider'
import { Connection } from '@solana/web3.js'

export const useWeb3AuthSolana = () => {
  const [solanaWallet, setSolanawallet] = useState<SolanaWallet>()
  const [solanaConnection, setSolanaConnection] = useState<Connection>()

  const auth = useStore($auth)
  const router = useRouter()
  const pathname = usePathname()

  const { user, isLoading } = useUser()
  const { mutateAsync } = api.user.getToken.useMutation()

  const connectWeb3Auth = useCallback(async () => {
    try {
      const response = await mutateAsync()
      const token = response as string

      const { sub } = parseToken(token)

      await web3auth.connect({
        verifier: 'astra-auth0-agg',
        verifierId: sub,
        idToken: token,
        subVerifierInfoArray: [
          {
            idToken: token,
            verifier: (sub as string).includes('google')
              ? 'astra-auth0-google-agg'
              : 'astra-auth0-ep-agg',
          },
        ],
      })
    } catch (error) {
      router.push(routes.logout)
    }
  }, [])

  useEffect(() => {
    if (!isLoading) {
      const connected = web3auth.status === 'connected'

      if (connected && !user) {
        web3auth.logout()
      }
    }
  }, [user, isLoading])

  useEffect(() => {
    const ready = web3auth.status === 'ready'
    const isVerifyPage = pathname.includes('/verify-email')

    if (ready || isVerifyPage) {
      return
    }

    // @ts-expect-error hello
    web3auth.init(privateKeyProvider).then(() => {
      /** subscribe to web3auth events */
      web3auth.on(ADAPTER_EVENTS.CONNECTED, async () => {
        console.log('web3Auth connected')

        const provider = web3auth.provider
        const wallet = provider ? new SolanaWallet(provider) : null

        if (wallet) {
          await wallet.requestAccounts()

          const connectionConfig = (await wallet.request({
            method: 'solana_provider_config',
            params: [],
          })) as {
            rpcTarget: string
          }

          const connection = new Connection(connectionConfig.rpcTarget)

          setSolanawallet(wallet)
          setSolanaConnection(connection)
        }
      })

      web3auth.on(ADAPTER_EVENTS.DISCONNECTED, async () => {
        console.log('web3Auth disconnected')
      })

      web3auth.on(ADAPTER_EVENTS.ERRORED, error => {
        console.log('error', error)
      })

      /** connect web3auth */
      if (web3auth.status === 'ready') {
        connectWeb3Auth()
      }
    })

    return () => {
      web3auth.removeAllListeners()
    }
  }, [])

  return {
    ...auth,
    web3auth,
    solanaWallet,
    solanaConnection,
  }
}
