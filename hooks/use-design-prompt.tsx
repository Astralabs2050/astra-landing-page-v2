import { routes } from '@/constants/app-routes'
import { api } from '@/services/trpc-client'
import { $design } from '@/store/design'
import { useStore } from '@nanostores/react'
import { useRouter } from 'next/navigation'

export const useDesignPrompt = () => {
  const design = useStore($design)
  const router = useRouter()

  const { mutateAsync, isLoading } =
    api.design.generateInspiration.useMutation()

  const generateInspiration = async () => {
    const result = await mutateAsync({ prompt: design.prompt })
    // @ts-expect-error mismatch
    $design.setKey('inspiration', result)
    router.push(`${routes.dashboard.inspiration}?generated=${result.id}`)
  }

  return {
    ...design,
    generateInspiration,
    loading: isLoading,
    setState: $design.setKey,
  }
}
