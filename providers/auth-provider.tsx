import { useWeb3Auth } from '@/hooks/use-web3-auth'
import React, { createContext, PropsWithChildren, useContext } from 'react'

type AuthContextType = ReturnType<typeof useWeb3Auth>
const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: PropsWithChildren) {
  const auth = useWeb3Auth()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
