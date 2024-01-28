import * as jose from 'jose'
import { Cookies } from '@/constants/enums'
import { cookies } from 'next/headers'
import { web3authJWKSEndpoint } from '@/constants/urls'

export async function getServerSession() {
  const cookiestore = cookies()

  const id_token = cookiestore.get(Cookies.ID_TOKEN)
  const app_public_key = cookiestore.get(Cookies.APP_PUBLIC_KEY)

  if (!id_token || !app_public_key) {
    return null
  }

  const jwks = jose.createRemoteJWKSet(new URL(web3authJWKSEndpoint))

  const decoded = await jose.jwtVerify(id_token.value, jwks, {
    algorithms: ['ES256'],
  })

  const isValidToken =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (decoded.payload as any).wallets[0].public_key.toLowerCase() ===
    app_public_key.value.toLowerCase()

  return isValidToken ? decoded.payload : null
}
