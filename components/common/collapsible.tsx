'use client'

import React, { PropsWithChildren, useState } from 'react'
import { Button } from '../ui'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CollapsibleProps extends PropsWithChildren {
  title: React.ReactNode
}

export const Collapsible = ({ title, children }: CollapsibleProps) => {
  const [open, setOpen] = useState(true)

  return (
    <div className="rounded-2xl bg-gray-6">
      <div className="flex items-center justify-between px-10 py-4">
        {typeof title === 'string' ? (
          <h3 className="text-xl font-medium">{title}</h3>
        ) : (
          title
        )}
        <Button variant="ghost" size="icon" onClick={() => setOpen(!open)}>
          <ChevronDown
            className={cn('size-6 transition-all', { 'rotate-180': open })}
          />
        </Button>
      </div>

      <div hidden={!open} className="border-t border-gray-5 px-10 py-6">
        {children}
      </div>
    </div>
  )
}
