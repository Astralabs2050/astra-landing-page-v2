import { UserProvider } from '@auth0/nextjs-auth0/client'
import { PropsWithChildren } from 'react'

export const OauthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <UserProvider>{children}</UserProvider>
}
