'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { nano } from '@/lib/nano'

export interface ComboboxProps {
  onSearch?: (query: string) => void
  placeholder?: string
  options: {
    value: string
    label: string
  }[]
}

export function Combobox({ options, placeholder, onSearch }: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between">
          {value
            ? options.find(item => item.value === value)?.label
            : 'Select item...'}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-full p-0"
        style={{ width: 'var(--radix-popper-anchor-width)' }}>
        <Command>
          <CommandInput
            value={value}
            placeholder={placeholder}
            onValueChange={onSearch}
          />
          <CommandEmpty>No items found.</CommandEmpty>
          <CommandGroup>
            {options.map((item, index) => (
              <CommandItem
                key={index + nano()}
                value={item.value}
                onSelect={currentValue => {
                  setValue(currentValue === value ? '' : currentValue)
                  setOpen(false)
                }}>
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === item.value ? 'opacity-100' : 'opacity-0',
                  )}
                />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
