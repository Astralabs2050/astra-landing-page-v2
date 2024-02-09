import { map } from 'nanostores'
import { z } from 'zod'

export const $design = map({
  prompt: z.string()._input,
  imagePrompt: z.string()._input,
  inspiration: [] as string[],
})
