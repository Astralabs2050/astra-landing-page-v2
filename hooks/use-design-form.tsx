import { routes } from '@/constants/app-routes'
import { api } from '@/services/trpc-client'
import { $designform } from '@/store/design'
import { ValuesOf } from '@/types/utils'
import { useStore } from '@nanostores/react'
import { JobTarget } from '@prisma/client'
import { useRouter } from 'next-nprogress-bar'

export const useDesignForm = (target: JobTarget, id?: string) => {
  const designform = useStore($designform)
  const router = useRouter()

  const { mutateAsync, isLoading: savingInfo } = api.design.update.useMutation()

  const updatePiece = (
    index: number,
    key: keyof (typeof designform.pieces)[0],
    value: ValuesOf<(typeof designform.pieces)[0]>,
  ) => {
    const data = [...designform.pieces]

    data[index] = {
      ...data[index],
      [key]: value,
    }

    $designform.setKey('pieces', data)
  }

  const saveInformation = async () => {
    const design = await mutateAsync({
      id,
      name: designform.name,
      pieces: designform.pieces,
    })

    const url = `${routes.dashboard.create}?target=${target}&id=${design.id}&step=2`
    router.push(url)
  }

  return {
    ...designform,
    updatePiece,
    saveInformation,
    savingInfo,
    updateState: $designform.setKey,
  }
}
