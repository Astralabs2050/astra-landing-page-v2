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
          handleFileChange(event, onFileChange, maxSize)
          setFile(event.target.files?.[0])
        }}
      />
    )

    return (
      <div
        className={cn(
          'flex w-full flex-col gap-2',
          { 'grid size-fit place-items-center': children },
          className,
        )}>
        {label && <p className="text-sm font-normal">{label}</p>}
        {children ? (
          <label className="grid size-fit cursor-pointer place-items-center">
            {input}
            {children(file)}
          </label>
        ) : (
          <label className="group relative grid h-40 w-full cursor-pointer place-items-center overflow-hidden rounded-lg border  bg-contain bg-center">
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
              <small className="text-sm font-medium">
                Max File Size:{' '}
                <span className="text-yellow-500">{formatBytes(maxSize)}</span>
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
