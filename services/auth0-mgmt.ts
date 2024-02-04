import { env } from '@/env.mjs'
import { ManagementClient } from 'auth0'

export const auth0mgmt = new ManagementClient({
  domain: env.AUTH0_DOMAIN,
  clientId: env.AUTH0_CLIENT_ID,
  clientSecret: env.AUTH0_CLIENT_SECRET,
})
