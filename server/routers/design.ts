import { string, z } from 'zod'
import {
  createTRPCRouter,
  authenticatedProcedure,
} from '@/services/trpc-server'

export const designRouter = createTRPCRouter({
  get: authenticatedProcedure
    .input(
      z.object({
        id: string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.design.findUnique({
        where: { id: input.id },
      })
    }),
})
