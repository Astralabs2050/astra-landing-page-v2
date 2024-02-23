'use client'

import React, { useState } from 'react'
import { formatBytes, handleFileChange } from '@/lib/forms'

import Upload from '@/public/svgs/upload.svg'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface FileUploadProps {
  label?: string
  value: string
  name?: string
  className?: string
  containerClassName?: string
  required?: boolean
  accept?: ('image/png' | 'image/jpeg' | 'image/avif' | 'image/webp')[]
  previewSize?: 'cover' | 'contain'
  children?: (file?: File) => React.ReactNode
  onFileChange: (file: Blob) => void
}

export const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  (props, ref) => {
    const [file, setFile] = useState<File>()

    const maxSize = 1 * 1024 * 1024

    const {
      children,
      accept,
      onFileChange,
      label,
      value,
      name,
      className,
      containerClassName,
      previewSize = 'cover',
    } = props

    const input = (
      <input
        hidden
        value=""
        name={name}
        type="file"
        ref={ref}
        accept={!accept ? '*' : accept.join(',')}
        multiple={false}
        onChange={event => {
          const callback = (file: Blob) => {
            onFileChange(file)
            setFile(event.target.files?.[0])
          }

          handleFileChange(event, callback, maxSize)
        }}
      />
    )

    return (
      <div
        className={cn(
          'flex w-full flex-col gap-2',
          { 'grid size-fit place-items-center': children },
          containerClassName,
        )}>
        {label && <p className="text-sm font-normal">{label}</p>}
        {children ? (
          <label className="grid size-fit w-full cursor-pointer place-items-center">
            {input}
            {children(file)}
          </label>
        ) : (
          <label
            className={cn(
              'group relative grid h-40 w-full cursor-pointer place-items-center overflow-hidden rounded-lg border  bg-contain bg-center',
              className,
            )}>
            {input}
            <div
              className={cn(
                'relative z-10 flex h-full w-full flex-col items-center justify-center gap-1',
                {
                  'opacity-0 transition-all hover:backdrop-blur-sm group-hover:opacity-100':
                    value,
                },
              )}>
              <Upload className="size-8" />
              <small className="text-sm font-medium text-gray-3">
                Max File Size: <span>{formatBytes(maxSize)}</span>
              </small>
            </div>

            {value && (
              <div className="absolute inset-0 z-0">
                <Image
                  fill
                  alt="new upload"
                  src={value ?? URL.createObjectURL(file as Blob)}
                  className={cn({
                    'object-cover': previewSize === 'cover',
                    'object-contain': previewSize === 'contain',
                  })}
                />
              </div>
            )}
          </label>
        )}
      </div>
    )
  },
)
