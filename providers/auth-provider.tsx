import { Spinner } from '@/components/ui'
import { useWeb3Auth } from '@/hooks'
import React, { createContext, PropsWithChildren, useContext } from 'react'
import { useAccount } from 'wagmi'

type AuthContextType = ReturnType<typeof useWeb3Auth>
const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: PropsWithChildren) {
  const auth = useWeb3Auth()
  const account = useAccount()

  if (auth.user?.onboarded && !account.address) {
    return <Spinner fullScreen />
  }

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
