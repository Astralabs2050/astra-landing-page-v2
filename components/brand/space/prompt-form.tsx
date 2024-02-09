'use client'

import React, { Fragment } from 'react'
import Picture from '@/public/svgs/picture.svg'
import Sparkles from '@/public/svgs/sparkles.svg'
import { Button, FileUpload, Input } from '@/components/ui'
import { useStore } from '@nanostores/react'
import { $design } from '@/store/design'
import Image from 'next/image'

export const PromptForm = () => {
  const design = useStore($design)

  return (
    <Fragment>
      {!design.inspiration.length && (
        <div className="flex justify-center pt-20">
          <Image
            alt="Empty state"
            src="/imgs/empty-state.png"
            width={139}
            height={139}
            className="size-32"
          />
        </div>
      )}

      <form className="fixed bottom-0 left-[var(--sidebar-width)] right-0 mt-auto border-t p-6">
        <div className="relative">
          <Input
            value={design.prompt}
            onChange={e => $design.setKey('prompt', e.target.value)}
            placeholder="Female model wearing multi-coloured jumpsuit"
            className="h-14 w-full bg-neutral-100 focus-within:ring-0"
            prepend={
              <FileUpload
                value={design.imagePrompt ?? ''}
                onFileChange={file => {
                  $design.setKey('imagePrompt', URL.createObjectURL(file))
                }}>
                {() => <Picture className="size-6" />}
              </FileUpload>
            }
          />

          <div className="absolute inset-y-0 right-3 grid place-items-center">
            <Button
              size="sm"
              className="min-w-32 rounded-md bg-blue-radial text-sm font-normal tracking-normal">
              <Sparkles className="mr-1 size-4" />
              Generate
            </Button>
          </div>
        </div>
      </form>
    </Fragment>
  )
}
