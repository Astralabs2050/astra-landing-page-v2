import { z } from 'zod'
import { nano } from '@/lib/nano'
import { CreatorType } from '@prisma/client'
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
        target: z.nativeEnum(CreatorType),
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

  getPostings: authenticatedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.job.findMany({
      where: {
        design: { brandId: { equals: ctx.session.userId } },
      },
      include: {
        design: {
          include: {
            sketches: true,
            pieces: true,
          },
        },
      },
    })
  }),
})
