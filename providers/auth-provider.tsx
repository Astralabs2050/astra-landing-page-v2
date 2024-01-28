'use client'

import { useWeb3Auth } from '@/hooks/use-web3-auth'
import React, { createContext, PropsWithChildren, useContext } from 'react'

type AuthContextType = ReturnType<typeof useWeb3Auth>

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: PropsWithChildren) {
  const auth = useWeb3Auth()
  /**
   * perform all auth logic here
   * e.g for supabase, you would want to subscribe
   * to auth events.
   */

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
