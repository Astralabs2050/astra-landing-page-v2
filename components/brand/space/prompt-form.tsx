'use client'

import React, { Fragment } from 'react'
import Picture from '@/public/svgs/picture.svg'
import Sparkles from '@/public/svgs/sparkles.svg'
import { Button, FileUpload, Input, Spinner } from '@/components/ui'
import { $design } from '@/store/design'
import Image from 'next/image'
import { useDesignPrompt } from '@/hooks/use-design-prompt'
import { PromptResults } from './prompt-results'

export const PromptForm = () => {
  const { prompt, imagePrompt, inspiration, generateInspiration, loading } =
    useDesignPrompt()

  return (
    <Fragment>
      {!inspiration.length ? (
        <div className="flex justify-center pt-20">
          <Image
            alt="Empty state"
            src="/imgs/empty-state.png"
            width={139}
            height={139}
            className="size-32"
          />
        </div>
      ) : (
        <PromptResults />
      )}

      <form
        className="fixed bottom-0 left-sidebar right-0 z-20 mt-auto border-t p-6"
        onSubmit={e => {
          e.preventDefault()
          generateInspiration()
        }}>
        <div className="relative">
          {inspiration.length ? (
            <div className="grid w-full place-items-center">
              <Button
                type="button"
                className="min-w-32 rounded-md bg-blue-radial font-normal tracking-normal">
                <Sparkles className="mr-2 size-5" />
                Bring Your idea To Life
              </Button>
            </div>
          ) : (
            <Fragment>
              <Input
                required
                value={prompt}
                disabled={loading}
                onChange={e => $design.setKey('prompt', e.target.value)}
                placeholder="Female model wearing multi-coloured jumpsuit"
                className="h-14 w-full bg-neutral-100 focus-within:ring-0"
                prepend={
                  <FileUpload
                    value={imagePrompt ?? ''}
                    onFileChange={file => {
                      $design.setKey('imagePrompt', URL.createObjectURL(file))
                    }}>
                    {() => <Picture className="size-6" />}
                  </FileUpload>
                }
              />

              <div className="absolute inset-y-0 right-3 grid place-items-center">
                {loading ? (
                  <Spinner className="pr-2" />
                ) : (
                  <Button
                    size="sm"
                    className="min-w-32 rounded-md bg-blue-radial text-sm font-normal tracking-normal">
                    <Sparkles className="mr-1 size-4" />
                    Generate
                  </Button>
                )}
              </div>
            </Fragment>
          )}
        </div>
      </form>
    </Fragment>
  )
}
