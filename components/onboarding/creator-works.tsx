'use client'

import React from 'react'
import Image from 'next/image'
import { useOnboarding } from '@/hooks'
import { Notice } from '../common'
import { useRouter } from 'next-nprogress-bar'
import { Button, FileUpload, Input, Spinner, Textarea } from '../ui'
import PlusCircle from '@/public/svgs/plus-circle.svg'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet'
import { Edit, Plus, Trash } from 'lucide-react'

export const CreatorWorks = () => {
  const router = useRouter()

  const {
    currentWork,
    setCurrentWork,
    setFormValue,
    submitted,
    submitting,
    saveCreatorSamples,
    works,
  } = useOnboarding()

  if (submitted) {
    return (
      <Notice
        title="Welcome to ASTRA!"
        subtitle="You have successfully onboarded your brand on Astra, head to your dashboard and start creating!"
        cta={{
          text: 'Go to Dashboard',
          action: () => router.push('/dashboard'),
        }}
      />
    )
  }

  return (
    <div className="mx-auto flex w-[32rem] flex-col space-y-12">
      <div className="mt-10 space-y-2 text-center">
        <h1 className="text-3xl font-medium">Upload some of your best works</h1>
      </div>

      <div
        className="grid gap-4"
        hidden={!works.length || (works.length === 1 && currentWork === 0)}>
        {works.map((work, index) => {
          if (
            !work.title ||
            !work.shots.length ||
            (works.length === 1 && currentWork === 0)
          ) {
            return null
          }

          return (
            <div
              key={index}
              className="w-full rounded-xl border border-solid border-gray-6 p-4">
              <div className="mb-4 flex items-center justify-between border-b border-solid border-gray-6 px-2 pb-3">
                <h3 className="text-xl font-medium">{work.title}</h3>
                <div className="flex items-center gap-4">
                  <Button
                    size="fit"
                    variant="ghost"
                    className="flex min-w-fit items-center gap-1 font-normal text-gray-3 hover:bg-transparent hover:text-destructive"
                    onClick={() => {
                      const creatorworks = [...works]
                      creatorworks.splice(index, 1)
                      setFormValue('works', creatorworks)
                    }}>
                    <Trash className="size-4" />
                    Remove
                  </Button>

                  <Button
                    size="fit"
                    variant="ghost"
                    className="flex min-w-fit items-center gap-1 font-normal text-gray-3 hover:bg-transparent"
                    onClick={() => setCurrentWork(index)}>
                    <Edit className="size-4" />
                    Edit
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {work.shots.map((shot, index) => (
                  <Image
                    key={index}
                    alt={work.title}
                    src={shot}
                    width={225}
                    height={199}
                    className="aspect-square size-full rounded-xl object-cover"
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <div>
        <Sheet
          modal
          open={currentWork !== undefined}
          onOpenChange={open => !open && setCurrentWork(undefined)}>
          <SheetTrigger
            asChild={!!works.length}
            className="w-full"
            onClick={() => setCurrentWork(works.length)}>
            {works.length > 1 || (works.length && currentWork !== 0) ? (
              <div className="-mt-6 flex w-full border-b border-solid border-gray-6 pb-6">
                <Button type="button" variant="secondary" className="ml-auto">
                  <Plus className="mr-2 size-4" />
                  Add New Piece
                </Button>
              </div>
            ) : (
              <div className="grid h-[18.5rem] w-full cursor-pointer place-items-center rounded-lg bg-gray-6">
                <PlusCircle className="size-14 text-gray-5" />
              </div>
            )}
          </SheetTrigger>
          <SheetContent
            onPointerDownOutside={e => e.preventDefault()}
            className="flex flex-col">
            <SheetHeader className="mb-10">
              <SheetTitle className="text-center text-2xl font-medium">
                Upload your work
              </SheetTitle>
            </SheetHeader>

            {currentWork !== undefined && (
              <form className="grid grid-cols-1 gap-10">
                <Input
                  id="title"
                  name="title"
                  value={works[currentWork]?.title ?? ''}
                  label={<span className="font-medium">Project Title</span>}
                  placeholder="What is the title of your project?"
                  onChange={e => {
                    const creatorworks = [...works]
                    creatorworks[currentWork].title = e.target.value

                    setFormValue('works', creatorworks)
                  }}
                />

                <div className="grid gap-2">
                  <p className="font-medium">Upload project images</p>
                  <div className="grid grid-cols-2 gap-4">
                    {[0, 1, 2, 3].map(index => (
                      <FileUpload
                        key={index}
                        value={works[currentWork]?.shots[index] ?? ''}
                        onFileChange={file => {
                          const creatorworks = [...works]

                          const work = creatorworks[currentWork]
                          const shots = [...work.shots]

                          shots[index] = URL.createObjectURL(file)
                          creatorworks[currentWork] = {
                            ...work,
                            shots,
                          }

                          setFormValue('works', creatorworks)
                        }}
                      />
                    ))}
                  </div>
                </div>

                <Textarea
                  required
                  value={works[currentWork]?.description ?? ''}
                  name="description"
                  id="description"
                  placeholder="Write a short description about this work"
                  label={
                    <span className="font-medium">Project Description</span>
                  }
                  onChange={e => {
                    const creatorworks = [...works]
                    creatorworks[currentWork].description = e.target.value
                    setFormValue('works', creatorworks)
                  }}
                />
              </form>
            )}

            <Button
              className="mt-auto w-full"
              onClick={() => setCurrentWork(undefined)}
              disabled={
                currentWork === undefined ||
                !works[currentWork]?.title ||
                !works[currentWork]?.shots.length
              }>
              Save
            </Button>
          </SheetContent>
        </Sheet>
      </div>

      <Button
        type="submit"
        className="mx-auto mt-auto w-[90%]"
        disabled={submitting || !works.length}
        onClick={saveCreatorSamples}>
        {submitting ? (
          <Spinner text="Submitting" spinnerClass="fill-black w-5 h-5" />
        ) : (
          'Next'
        )}
      </Button>
    </div>
  )
}
