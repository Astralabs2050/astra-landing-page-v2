/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from 'react'
import {
  parseToken,
  privateKeyProvider,
  web3auth,
  web3authConnector,
} from '@/lib/web3auth'
import { ADAPTER_EVENTS } from '@web3auth/base'
import { useDisconnect, useConnect } from 'wagmi'
import { $auth } from '@/store/auth'
import { useStore } from '@nanostores/react'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useRouter } from 'next/navigation'

export const useWeb3Auth = () => {
  const auth = useStore($auth)
  const router = useRouter()

  const { user } = useUser()
  const { disconnect } = useDisconnect()
  const { connectAsync } = useConnect()

  const connectWeb3Auth = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/id-token')
      const token = await res.text()

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
      console.log(error, '>>>>>')
      router.push('/api/auth/logout')
    }
  }, [])

  useEffect(() => {
    if (web3auth.status === 'ready') {
      return
    }

    web3auth.init(privateKeyProvider).then(() => {
      /** subscribe to web3auth events */
      web3auth.on(ADAPTER_EVENTS.CONNECTED, async () => {
        await connectAsync({
          connector: web3authConnector,
        }).catch(err => console.log(err))

        console.log('web3Auth connected')
      })

      web3auth.on(ADAPTER_EVENTS.DISCONNECTED, async () => {
        disconnect()
        console.log('web3Auth disconnected')
      })

      web3auth.on(ADAPTER_EVENTS.ERRORED, error => {
        console.log('error', error)
      })

      if (web3auth.status === 'connected' && !user) {
        web3auth.logout()
      }

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
  }
}
