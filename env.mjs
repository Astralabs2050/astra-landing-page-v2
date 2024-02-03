import { z } from 'zod'
import { createEnv } from '@t3-oss/env-nextjs'

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']),
    BASE_URL: z.string().url(),
    DIRECT_URL: z.string().url(),
    DATABASE_URL: z.string().url(),
    GOOGLE_CLIENT_SECRET: z.string(),
    AUTH0_SECRET: z.string(),
    AUTH0_BASE_URL: z.string().url(),
    AUTH0_ISSUER_BASE_URL: z.string().url(),
    AUTH0_CLIENT_ID: z.string(),
    AUTH0_CLIENT_SECRET: z.string(),
  },

  client: {
    NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
    NEXT_PUBLIC_WEB3_CLIENT_ID: z.string(),
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: z.string(),
  },

  experimental__runtimeEnv: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_WEB3_CLIENT_ID: process.env.NEXT_PUBLIC_WEB3_CLIENT_ID,
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  },
})
