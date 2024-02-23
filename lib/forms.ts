import { ChangeEvent } from 'react'

export const formatBytes = (bytes: number) => {
  const decimals = 2
  if (!+bytes) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))}${sizes[i]}`
}

export const handleFileChange = (
  event: ChangeEvent<HTMLInputElement>,
  callback: (file: File) => void,
  maxSize: number,
) => {
  const files = event.target.files

  if (files && files[0]) {
    const file = files[0]

    if (file.size > maxSize) {
      alert(`File size must be no larger than ${formatBytes(maxSize)}`)
      return
    }

    callback(file)
  }
}
