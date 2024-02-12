import React, { useState } from 'react'
import Sparkles from '@/public/svgs/sparkles.svg'
import CreditCard from '@/public/svgs/credit-card-refresh.svg'
import ShirtFolded from '@/public/svgs/shirt-folded.svg'
import Cube from '@/public/svgs/cube.svg'

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui'
import { JobTarget } from '@prisma/client'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

interface PromptDialogProps {
  id: string
}

export const PromptDialog = ({}: PromptDialogProps) => {
  const [selected, setSelected] = useState<JobTarget>()

  const options = [
    {
      title: 'Turn to 3D',
      description: 'Turn your idea into 3D for AR/VR sales in a virtual store',
      Icon: Cube,
      value: JobTarget.DESIGNER,
    },
    {
      title: 'Make it Real',
      description: 'Find a tailor or manufacturer to make a sample made',
      Icon: ShirtFolded,
      value: JobTarget.MANUFACTURER,
    },
  ]

  return (
    <div className="grid w-full place-items-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            type="button"
            className="min-w-32 rounded-md bg-blue-radial font-normal tracking-normal">
            <Sparkles className="mr-2 size-5" />
            Bring Your idea To Life
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader className="flex flex-row items-center justify-between">
            <Button
              variant="outline"
              size="icon"
              type="button"
              title="Fund Wallet"
              className="size-12 border-gray-5">
              <CreditCard className="size-6" />
            </Button>
          </DialogHeader>

          <div className="grid gap-4">
            {options.map(({ value, title, description, Icon }, index) => (
              <Button
                key={index}
                variant="ghost"
                size="fit"
                value={value}
                onClick={() => setSelected(value)}
                className={cn(
                  'group relative flex justify-start space-x-4 rounded-xl border border-gray-6 p-3 text-left transition-all duration-200',
                  {
                    'text-blue-1 ring-1 ring-blue-1': selected === value,
                    'border-transparent hover:text-blue-1': selected === value,
                    'hover:border-gray-6 hover:bg-transparent':
                      selected === value,
                  },
                )}>
                <div
                  className={cn(
                    'grid size-12 place-items-center rounded-full bg-gray-6 transition-all group-hover:bg-gray-5',
                    {
                      'bg-blue-50 ring-1 ': selected === value,
                      'ring-blue-500 group-hover:bg-blue-50':
                        selected === value,
                    },
                  )}>
                  <Icon className="size-6" />
                </div>
                <div>
                  <p className="text-lg font-medium">{title}</p>
                  <p
                    className={cn('font-normal text-gray-3', {
                      'text-blue-1/80': selected === value,
                    })}>
                    {description}
                  </p>
                </div>

                {selected === value && (
                  <Check className="absolute right-3 top-3 size-5 text-blue-1" />
                )}
              </Button>
            ))}
          </div>

          <DialogFooter className="mt-4 grid grid-cols-2 gap-2">
            <DialogClose asChild>
              <Button variant="outline" radii="pill" size="lg">
                Cancel
              </Button>
            </DialogClose>
            <Button radii="pill" size="lg" disabled={!selected}>
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
