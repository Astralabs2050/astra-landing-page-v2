import {
  createTRPCRouter,
  authenticatedProcedure,
} from '@/services/trpc-server'
import { basicProfileInput } from '../utils/router-inputs'
import { z } from 'zod'
import { nano } from '@/lib/nano'

export const creatorRouter = createTRPCRouter({
  get: authenticatedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.creatorProfile.findUnique({
      where: { ownerId: ctx.session.userId },
    })
  }),

  updateBasicProfile: authenticatedProcedure
    .input(basicProfileInput)
    .mutation(async ({ ctx, input }) => {
      const { name, bio, location } = input
      const { name: city, ...rest } = location

      const data = {
        name,
        bio,
        city,
        zip: rest.zip,
        lat: rest.lat,
        lng: rest.lng,
        countryCode: rest.countryCode,
        email: ctx.session.user.email,
        ownerId: ctx.session.userId,
        province1: rest.admin1,
        province2: rest.admin2,
      }

      const creator = await ctx.prisma.creatorProfile.upsert({
        where: { ownerId: ctx.session.userId },
        create: data,
        update: data,
        include: {
          owner: {
            select: {
              onboarded: true,
            },
          },
        },
      })

      return creator
    }),

  getWorkSamples: authenticatedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.creatorWork.findMany({
      where: { creatorId: ctx.session.userId },
    })
  }),

  saveWorkSamples: authenticatedProcedure
    .input(
      z.object({
        samples: z.array(
          z.object({
            title: z.string(),
            description: z.string().nullable(),
            shots: z.array(z.string()),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.creatorWork.deleteMany({
        where: { creatorId: ctx.session.userId },
      })

      const works = await ctx.prisma.creatorWork.createMany({
        data: input.samples.map(item => ({
          ...item,
          id: nano(),
          creatorId: ctx.session.userId,
        })),
      })

      await ctx.prisma.user.update({
        where: { id: ctx.session.userId },
        data: { onboarded: true },
      })

      return works
    }),
})
