import { env } from '@/env.mjs'
import { GenerationParams, GenerationResponse } from '@/types/dreamstudio'

export const generate = async (params: GenerationParams) => {
  const apiKey = env.STABILITY_AI_KEY
  const apiHost = 'https://api.stability.ai'

  const url = `${apiHost}/v1/generation/${params.engineId}/text-to-image`

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${apiKey}`,
  }

  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  })

  if (!res.ok) {
    throw new Error(`${await res.text()}`)
  }

  const json = await res.json()
  const data = json as GenerationResponse

  return data.artifacts.map(image => ({
    ...image,
    buffer: Buffer.from(image.base64, 'base64'),
  }))
}
