import { routes } from '@/constants/app-routes'
import { nano } from '@/lib/nano'
import { prepareFile, uploadBucketImage } from '@/services/storage'
import { StorageBucket } from '@/services/supabase'
import { api } from '@/services/trpc-client'
import { $designform } from '@/store/design'
import { Design } from '@/types/models'
import { ValuesOf } from '@/types/utils'
import { useStore } from '@nanostores/react'
import { JobTarget } from '@prisma/client'
import { useRouter } from 'next-nprogress-bar'
import { useEffect, useRef } from 'react'

export const useDesignForm = (target: JobTarget, design?: Design) => {
  const init = useRef(false)

  const designform = useStore($designform)
  const router = useRouter()

  if (design && init.current === false) {
    $designform.setKey('name', design.name ?? '')
    $designform.setKey('pieces', design.pieces)

    init.current = true
  }

  const { mutateAsync, isLoading: updating } = api.design.update.useMutation()
  const { mutateAsync: createJob, isLoading } = api.job.create.useMutation()

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
    const mutatedDesign = await mutateAsync({
      id: design?.id,
      name: designform.name,
      pieces: designform.pieces,
    })

    const url = `${routes.dashboard.create}?target=${target}&id=${mutatedDesign.id}&step=2`
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
        const uploadPath = `/${design?.id}/sketches`

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
        const uploadPath = `/${design?.id}/prints`

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

      const mutatedDesign = await mutateAsync({
        id: design?.id,
        sketches: sketches.filter(item => !!item.url),
        preDesignedPrints: prints.filter(item => !!item),
      })

      const url = `${routes.dashboard.create}?target=${target}&id=${mutatedDesign.id}&step=3`
      router.push(url)
    } catch (error) {
      console.log(error)
    } finally {
      $designform.setKey('processing', false)
    }
  }

  const mintAndCreateJob = async () => {
    await createJob({ txHash: nano(), target, designId: design!.id })
    $designform.setKey('completed', true)
  }

  useEffect(() => {
    if (!design) {
      return
    }

    const sketches = [...designform.sketches]
    const prints = [...designform.prints]

    design.sketches.forEach(sketch => {
      const index = sketches.findIndex(item => item.view === sketch.view)

      if (index >= 0) {
        sketches[index] = sketch
      }
    })

    design.preDesignedPrints.forEach((print, index) => {
      prints[index] = print
    })

    $designform.setKey('sketches', sketches)
    $designform.setKey('prints', prints)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [design])

  return {
    ...designform,
    updatePiece,
    saveInformation,
    mintAndCreateJob,
    uploadSketchesAndPrints,
    loading: updating || isLoading,
    generated: design?.promptResults,
    updateState: $designform.setKey,
    data: design,
  }
}
