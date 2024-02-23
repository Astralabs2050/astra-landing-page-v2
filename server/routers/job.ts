import { z } from 'zod'
import { nano } from '@/lib/nano'
import { JobTarget } from '@prisma/client'
import {
  createTRPCRouter,
  authenticatedProcedure,
} from '@/services/trpc-server'

export const jobRouter = createTRPCRouter({
  create: authenticatedProcedure
    .input(
      z.object({
        designId: z.string(),
        txHash: z.string(),
        target: z.nativeEnum(JobTarget),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { target, designId, txHash } = input

      const design = await ctx.prisma.design.update({
        where: { id: designId },
        data: {
          txHash,
        },
      })

      return await ctx.prisma.job.create({
        data: {
          id: nano(),
          designId: design.id,
          target,
        },
      })
    }),
})
