import { useCallback, useEffect, useState } from 'react'
import { web3auth, web3authConnector } from '@/constants/web3auth'
import { ADAPTER_EVENTS, WALLET_ADAPTERS } from '@web3auth/base'
import { useDisconnect, useConnect } from 'wagmi'
import { OpenloginUserInfo } from '@web3auth/openlogin-adapter'
import { getPublicCompressed } from '@toruslabs/eccrypto'
import { setCookie } from '@/lib/cookies'
import { Cookies } from '@/constants/enums'

export const useWeb3Auth = () => {
  const [user, setUser] = useState(null)
  const [session, setSession] = useState<Partial<OpenloginUserInfo> | null>(
    null,
  )

  const { disconnect } = useDisconnect()
  const { connectAsync } = useConnect()

  const signIn = async () => {
    await web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
      loginProvider: 'google',
    })
  }

  const signOut = async () => {
    await web3auth.logout()
    setSession(null)
    setUser(null)
  }

  const setUserData = useCallback(async (auth: typeof web3auth) => {
    try {
      const session = await auth.getUserInfo()

      if (!session) {
        return signOut()
      }

      /** set cookies */
      const app_scoped_privkey = await web3auth.provider?.request({
        method: 'eth_private_key',
      })

      const app_pub_key: string = getPublicCompressed(
        Buffer.from((app_scoped_privkey as string).padStart(64, '0'), 'hex'),
      ).toString('hex')

      setCookie(Cookies.ID_TOKEN, session.idToken)
      setCookie(Cookies.APP_PUBLIC_KEY, app_pub_key)

      setSession(session)
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    web3auth.init().then(() => {
      web3auth.on(ADAPTER_EVENTS.CONNECTING, () => {
        console.log('connecting...')
      })

      web3auth.on(ADAPTER_EVENTS.CONNECTED, async () => {
        await connectAsync({
          connector: web3authConnector,
        })

        setUserData(web3auth)
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
  }, [connectAsync, disconnect, setUserData])

  return {
    signIn,
    signOut,
    session,
    user,
  }
}
