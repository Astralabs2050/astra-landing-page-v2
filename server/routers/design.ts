import { string, z } from 'zod'
import {
  createTRPCRouter,
  authenticatedProcedure,
} from '@/services/trpc-server'
import { generate } from '@/lib/dreamstudio'

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
      const { prompt } = input

      const images = await generate({
        engineId: 'stable-diffusion-xl-1024-v1-0',
        width: 896,
        height: 1152,
        samples: 2,
        text_prompts: [
          {
            text: prompt,
            weight: 1,
          },
        ],
      })

      console.log('imgs>>>>>>>>>', images[0])

      return [
        'https://humgswhkgxacucnrzpam.supabase.co/storage/v1/object/public/generations/gen-sample.png',
        'https://humgswhkgxacucnrzpam.supabase.co/storage/v1/object/public/generations/gen-sample.png',
        'https://humgswhkgxacucnrzpam.supabase.co/storage/v1/object/public/generations/gen-sample.png',
        'https://humgswhkgxacucnrzpam.supabase.co/storage/v1/object/public/generations/gen-sample.png',
      ]
    }),
})
