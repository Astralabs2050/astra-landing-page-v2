import { Spinner } from '@/components/ui'
import { useWeb3AuthSolana } from '@/hooks/use-web3-auth-solana'
import React, { createContext, PropsWithChildren, useContext } from 'react'

type AuthContextType = ReturnType<typeof useWeb3AuthSolana>
const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: PropsWithChildren) {
  const auth = useWeb3AuthSolana()

  if (auth.user?.onboarded && !auth.solanaWallet) {
    return <Spinner fullScreen />
  }

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
