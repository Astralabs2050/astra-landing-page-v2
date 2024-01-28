/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import {
  getPublicKey,
  parseToken,
  privateKeyProvider,
  web3auth,
  web3authConnector,
} from '@/lib/web3auth'
import { ADAPTER_EVENTS } from '@web3auth/base'
import { useDisconnect, useConnect } from 'wagmi'
import { setCookie } from '@/lib/cookies'
import { Cookies } from '@/constants/enums'
import { CredentialResponse, googleLogout } from '@react-oauth/google'
import { $auth } from '@/store/auth'
import { useStore } from '@nanostores/react'

export const useWeb3Auth = () => {
  const auth = useStore($auth)

  const { disconnect } = useDisconnect()
  const { connectAsync } = useConnect()

  const signOut = async () => {
    disconnect()
    googleLogout()

    $auth.setKey('session', null)
    $auth.setKey('user', null)

    await web3auth.logout().catch(err => console.log(err))
  }

  const signIn = async (response: CredentialResponse) => {
    $auth.setKey('loading', true)

    try {
      const idToken = response.credential

      if (idToken) {
        const { email } = parseToken(idToken)

        await web3auth.connect({
          verifierId: email,
          idToken: idToken,
          verifier: 'astra-google-auth',
        })
      }

      throw new Error('No ID Token present')
    } catch (err) {
      console.error(err)
    } finally {
      $auth.setKey('loading', false)
    }
  }

  useEffect(() => {
    web3auth.init(privateKeyProvider).then(() => {
      web3auth.on(ADAPTER_EVENTS.READY, () => {
        $auth.setKey('initialising', false)
      })

      web3auth.on(ADAPTER_EVENTS.CONNECTED, async () => {
        try {
          await connectAsync({
            connector: web3authConnector,
          })

          const session = await web3auth.getUserInfo()
          const publicKey = await getPublicKey()

          setCookie(Cookies.ID_TOKEN, session.idToken)
          setCookie(Cookies.APP_PUBLIC_KEY, publicKey)

          $auth.setKey('session', session)
        } catch (error) {
          console.log(error)
        }
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
    ...auth,
    signOut,
    signIn,
  }
}
