import OpenAI from 'openai'
import { string, z } from 'zod'
import {
  createTRPCRouter,
  authenticatedProcedure,
} from '@/services/trpc-server'
import { env } from '@/env.mjs'

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

  generateInspiration: authenticatedProcedure
    .input(z.object({ prompt: z.string() }))
    .mutation(async ({ input }) => {
      const openai = new OpenAI({
        apiKey: env.OPENAI_API_KEY,
      })

      const args: Parameters<typeof openai.images.generate>['0'] = {
        model: 'dall-e-3',
        size: '1024x1792',
        response_format: 'url',
        quality: 'hd',
        prompt: input.prompt,
      }

      const results = await Promise.all([
        openai.images.generate(args),
        openai.images.generate(args),
        openai.images.generate(args),
        openai.images.generate(args),
      ])

      return results.map(item => {
        return item.data[0].url!
      })
    }),
})
