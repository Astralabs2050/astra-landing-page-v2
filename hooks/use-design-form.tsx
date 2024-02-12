import { $designform } from '@/store/design'
import { ValuesOf } from '@/types/utils'
import { useStore } from '@nanostores/react'

export const useDesignForm = () => {
  const designform = useStore($designform)

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

  return {
    ...designform,
    updatePiece,
    updateState: $designform.setKey,
  }
}
