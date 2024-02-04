import { createTRPCRouter } from '@/services/trpc-server'
import { userRouter } from './user'
import { brandRouter } from './brand'

export const appRouter = createTRPCRouter({
  user: userRouter,
  brand: brandRouter,
})

export type AppRouter = typeof appRouter
