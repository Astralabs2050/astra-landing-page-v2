import { createTRPCRouter } from '@/services/trpc-server'
import { userRouter } from './user'
import { brandRouter } from './brand'
import { designRouter } from './design'

export const appRouter = createTRPCRouter({
  user: userRouter,
  brand: brandRouter,
  design: designRouter,
})

export type AppRouter = typeof appRouter
