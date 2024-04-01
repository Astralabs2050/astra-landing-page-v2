import { z } from 'zod'
import {
  createTRPCRouter,
  authenticatedProcedure,
} from '@/services/trpc-server'
import { basicProfileInput } from '../utils/router-inputs'

export const brandRouter = createTRPCRouter({
  get: authenticatedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.brand.findUnique({
      where: { ownerId: ctx.session.userId },
    })
  }),

  update: authenticatedProcedure
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

      const brand = await ctx.prisma.brand.upsert({
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

      if (!brand.owner.onboarded) {
        await ctx.prisma.user.update({
          where: { id: ctx.session.userId },
          data: { onboarded: true },
        })
      }

      return brand
    }),

  getDesigns: authenticatedProcedure
    .input(z.object({ excludeDrafts: z.boolean().optional() }).optional())
    .query(async ({ ctx, input }) => {
      return ctx.prisma.design.findMany({
        where: {
          brandId: ctx.session.userId,
          txHash: input?.excludeDrafts ? { not: null } : undefined,
        },
        orderBy: input?.excludeDrafts
          ? undefined
          : [
              {
                txHash: { sort: 'desc', nulls: 'last' },
              },
              { createdAt: 'desc' },
            ],
        include: {
          pieces: true,
          sketches: true,
        },
      })
    }),

  getDrafts: authenticatedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.design.findMany({
      where: {
        brandId: ctx.session.userId,
        txHash: {
          equals: null,
        },
      },
      include: {
        pieces: true,
      },
    })
  }),
})
