import { z } from 'zod'
import { createEnv } from '@t3-oss/env-nextjs'

/**
 * provides type safe env variables
 * @see https://env.t3.gg/docs/introduction
 */
export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']),
    BASE_URL: z.string().url(),
    DIRECT_URL: z.string().url(),
    DATABASE_URL: z.string().url(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    NEXTAUTH_URL: z.string(),
    NEXTAUTH_SECRET: z.string(),
    EMAIL_FROM: z.string(),
    EMAIL_SERVER_USER: z.string(),
    EMAIL_SERVER_PASSWORD: z.string(),
    EMAIL_SERVER_HOST: z.string(),
    EMAIL_SERVER_PORT: z.string(),
    SUPABASE_SERVICE_ROLE_KEY: z.string(),
  },

  client: {
    NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  },

  experimental__runtimeEnv: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  },
})
