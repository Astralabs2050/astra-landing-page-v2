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
  },

  client: {
    NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
    NEXT_PUBLIC_WEB3_CLIENT_ID: z.string(),
  },

  experimental__runtimeEnv: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_WEB3_CLIENT_ID: process.env.NEXT_PUBLIC_WEB3_CLIENT_ID,
  },
})
