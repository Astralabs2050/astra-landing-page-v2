export interface GenerationResponse {
  artifacts: Array<{
    base64: string
    seed: number
    finishReason: string
  }>
}

export interface GenerationParams {
  engineId: 'stable-diffusion-xl-1024-v1-0'
  cfg_scale?: number
  width?: number
  height?: number
  samples?: number
  seed?: number
  steps?: number
  text_prompts: Array<{
    text: string
    weight: number
  }>
  clip_guidance_preset?:
    | 'NONE'
    | 'FAST_BLUE'
    | 'FAST_GREEN'
    | 'SIMPLE'
    | 'SLOW'
    | 'SLOWER'
    | 'SLOWEST'

  style_preset?:
    | '3d-model'
    | 'analog-film'
    | 'anime'
    | 'cinematic'
    | 'comic-book'
    | 'digital-art'
    | 'enhance'
    | 'fantasy-art'
    | 'isometric'
    | 'line-art'
    | 'low-poly'
    | 'modeling-compound'
    | 'neon-punk'
    | 'origami'
    | 'photographic'
    | 'pixel-art'
    | 'tile-texture'
}
