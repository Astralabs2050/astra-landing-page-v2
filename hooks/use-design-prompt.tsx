import { api } from '@/services/trpc-client'
import { $design } from '@/store/design'
import { useStore } from '@nanostores/react'

export const useDesignPrompt = () => {
  const design = useStore($design)
  const { mutateAsync, isLoading } =
    api.design.generateInspiration.useMutation()

  const generateInspiration = async () => {
    const results = await mutateAsync({ prompt: design.prompt })

    $design.setKey('inspiration', results)
  }

  return {
    ...design,
    generateInspiration,
    loading: isLoading,
    setState: $design.setKey,
  }
}
