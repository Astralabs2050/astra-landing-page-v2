import { env } from '@/env.mjs'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { PropsWithChildren } from 'react'

export const OauthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <GoogleOAuthProvider clientId={env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      {children}
    </GoogleOAuthProvider>
  )
}
