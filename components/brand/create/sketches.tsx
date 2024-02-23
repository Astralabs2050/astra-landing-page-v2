'use client'

import React from 'react'
import Image from 'next/image'
import { Button, FileUpload, Spinner } from '@/components/ui'
import { useDesignForm } from '@/hooks/use-design-form'
import { JobTarget, SketchView } from '@prisma/client'
import { cn } from '@/lib/utils'

export const Sketches = ({
  target,
  id,
}: {
  id?: string
  target: JobTarget
}) => {
  const {
    sketches,
    prints,
    updateState,
    uploadSketchesAndPrints,
    updating,
    processing,
  } = useDesignForm(target, id)

  return (
    <div className="mx-6 space-y-8">
      <div className="grid grid-cols-4 gap-2">
        {sketches.map((sketch, index) => (
          <FileUpload
            key={index}
            value={sketch.url}
            className="w-full"
            onFileChange={file => {
              const data = [...sketches]

              data[index] = {
                ...data[index],
                url: URL.createObjectURL(file),
              }

              updateState('sketches', data)
            }}>
            {() => {
              return (
                <div className="flex w-full flex-col items-center justify-center rounded-lg border border-dashed border-gray-5 p-5">
                  <p className="mb-2 text-sm font-medium">
                    {
                      {
                        [SketchView.FRONT]: 'Front View',
                        [SketchView.SIDE1]: 'Side View',
                        [SketchView.SIDE2]: 'Side View 2',
                        [SketchView.BACK]: 'Back View',
                      }[sketch.view]
                    }
                  </p>

                  <Image
                    alt={sketch.view}
                    src={sketch.url ?? '/imgs/view-placeholder.png'}
                    className={cn('h-[20rem] object-cover object-top', {
                      'mt-1': sketch.url,
                      'max-w-[90%]': !sketch.url,
                    })}
                    objectFit="cover"
                    objectPosition="top"
                    width={316}
                    height={514}
                  />
                </div>
              )
            }}
          </FileUpload>
        ))}
      </div>

      <div className="space-y-6 rounded-xl border border-gray-6 px-10 pb-9 pt-8">
        <div className="border-b pb-3">
          <h3 className="text-xl font-medium">
            Do you have any pre-designed prints?
          </h3>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {prints.map((print, index) => (
            <div key={index}>
              <FileUpload
                value={print}
                className="overflow-hidden rounded-lg border-transparent bg-muted"
                onFileChange={file => {
                  const data = [...prints]

                  data[index] = URL.createObjectURL(file)
                  updateState('prints', data)
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center pt-4">
        <Button
          size="lg"
          radii="pill"
          className="min-w-[40%]"
          disabled={updating || processing}
          onClick={uploadSketchesAndPrints}>
          {updating || processing ? (
            <Spinner text="Just a moment" spinnerClass="fill-black w-5 h-5" />
          ) : target === 'DESIGNER' ? (
            'Turn to 3D'
          ) : (
            'Create a physical version'
          )}
        </Button>
      </div>
    </div>
  )
}
