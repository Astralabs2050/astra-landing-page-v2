import { routes } from '@/constants/app-routes'
import { prepareFile, uploadBucketImage } from '@/services/storage'
import { StorageBucket } from '@/services/supabase'
import { api } from '@/services/trpc-client'
import { $designform } from '@/store/design'
import { ValuesOf } from '@/types/utils'
import { useStore } from '@nanostores/react'
import { JobTarget } from '@prisma/client'
import { useRouter } from 'next-nprogress-bar'

export const useDesignForm = (target: JobTarget, id?: string) => {
  const designform = useStore($designform)
  const router = useRouter()

  const { data } = api.design.get.useQuery({ id: id ?? '' }, { enabled: !!id })
  const { mutateAsync, isLoading: updating } = api.design.update.useMutation()

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

  const uploadSketchesAndPrints = async () => {
    $designform.setKey('processing', true)

    const sketches = [...designform.sketches]
    const prints = [...designform.prints]

    try {
      for (let i = 0; i < designform.sketches.length; i++) {
        const sketch = designform.sketches[i]

        if (!sketch.url || sketch.url.includes('blob') === false) {
          continue
        }

        const { fileBody, fileType } = await prepareFile(sketch.url)

        const fileName = `sketch-${i + 1}.${fileType ?? 'png'}`
        const uploadPath = `/${id}/sketches`

        const url = await uploadBucketImage(
          fileBody,
          fileName,
          uploadPath,
          StorageBucket.DESIGNS,
        )

        sketches[i] = {
          ...sketches[i],
          url,
        }
      }

      for (let i = 0; i < designform.prints.length; i++) {
        const print = designform.prints[i]

        if (!print || print.includes('blob') === false) {
          continue
        }

        const { fileBody, fileType } = await prepareFile(print)

        const fileName = `print-${i + 1}.${fileType ?? 'png'}`
        const uploadPath = `/${id}/prints`

        const url = await uploadBucketImage(
          fileBody,
          fileName,
          uploadPath,
          StorageBucket.DESIGNS,
        )

        prints[i] = url
      }

      $designform.setKey('sketches', sketches)
      $designform.setKey('prints', prints)

      const design = await mutateAsync({
        id,
        sketches: sketches.filter(item => !!item.url),
        preDesignedPrints: prints.filter(item => !!item),
      })

      const url = `${routes.dashboard.create}?target=${target}&id=${design.id}&step=3`
      router.push(url)
    } catch (error) {
      console.log(error)
    } finally {
      $designform.setKey('processing', false)
    }
  }

  return {
    ...designform,
    data,
    updatePiece,
    saveInformation,
    updating,
    uploadSketchesAndPrints,
    generated: data?.promptResults,
    updateState: $designform.setKey,
  }
}
