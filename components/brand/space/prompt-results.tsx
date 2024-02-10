import { Button } from '@/components/ui'
import { useDesignPrompt } from '@/hooks/use-design-prompt'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export const PromptResults = () => {
  const { prompt, inspiration, setState } = useDesignPrompt()

  return (
    <div className="absolute inset-0 left-sidebar top-header !mt-0  bg-white">
      <div className="p-6">
        <Button
          variant="ghost"
          size="fit"
          className="pr-10 hover:bg-transparent hover:opacity-75"
          onClick={() => {
            setState('inspiration', [])
          }}>
          <ArrowLeft className="mr-2 size-5" /> Go Back
        </Button>
      </div>
      <div className="space-y-2 bg-gray-6 px-6 py-5">
        <p className="text-gray-2">Prompt:</p>
        <p className="text-lg font-medium">{prompt ?? 'Femal model wearing'}</p>
      </div>
      <div className="space-y-4 p-6">
        <p className="text-lg text-gray-2">Results</p>
        <div className="grid grid-cols-4 gap-4">
          {inspiration.map((item, index) => (
            <Image
              key={index}
              alt={`Result for: ${prompt}`}
              src={item}
              width={896}
              height={1152}
              className="w-full rounded-md"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
