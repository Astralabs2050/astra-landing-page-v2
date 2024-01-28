import { useEffect } from 'react'
import { web3auth } from '@/constants/web3auth'
import {
  ADAPTER_EVENTS,
  CONNECTED_EVENT_DATA,
  WALLET_ADAPTERS,
} from '@web3auth/base'

export const useWeb3Auth = () => {
  const signIn = async () => {
    await web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
      loginProvider: 'google',
    })
  }

  useEffect(() => {
    web3auth.init().then(() => {
      web3auth.on(ADAPTER_EVENTS.CONNECTED, (data: CONNECTED_EVENT_DATA) => {
        console.log('connected to wallet', data)
      })

      web3auth.on(ADAPTER_EVENTS.CONNECTING, () => {
        console.log('connecting')
      })

      web3auth.on(ADAPTER_EVENTS.DISCONNECTED, () => {
        console.log('disconnected')
      })

      web3auth.on(ADAPTER_EVENTS.ERRORED, error => {
        console.log('error', error)
      })

      web3auth.on(ADAPTER_EVENTS.ERRORED, error => {
        console.log('error', error)
      })
    })

    return () => {
      web3auth.removeAllListeners()
    }
  }, [])

  return {
    signIn,
    web3auth,
  }
}
