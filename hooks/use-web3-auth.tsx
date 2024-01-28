import { useEffect } from 'react'
import { web3auth, web3authConnector } from '@/constants/web3auth'
import { ADAPTER_EVENTS, WALLET_ADAPTERS } from '@web3auth/base'
import { useDisconnect, useConnect } from 'wagmi'

export const useWeb3Auth = () => {
  const { disconnect } = useDisconnect()
  const { connect } = useConnect()

  const signIn = async () => {
    await web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
      loginProvider: 'google',
    })
  }

  useEffect(() => {
    web3auth.init().then(() => {
      web3auth.on(ADAPTER_EVENTS.CONNECTING, () => {
        console.log('connecting...')
      })

      web3auth.on(ADAPTER_EVENTS.CONNECTED, () => {
        connect({
          connector: web3authConnector,
        })
      })

      web3auth.on(ADAPTER_EVENTS.DISCONNECTED, () => {
        disconnect()
      })

      web3auth.on(ADAPTER_EVENTS.ERRORED, error => {
        console.log('error', error)
      })
    })

    return () => {
      web3auth.removeAllListeners()
    }
  }, [connect, disconnect])

  return {
    signIn,
    web3auth,
  }
}
