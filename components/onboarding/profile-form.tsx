'use client'

import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import cities from 'cities.json'
import { User } from '@prisma/client'
import { debounce } from 'lodash'
import { Search } from 'lucide-react'
import { City } from '@/types/models'
import {
  ComboboxProps,
  Input,
  Spinner,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandDialog,
} from '../ui'

interface ProfileFormProps {
  user?: User | null
}

type Options = ComboboxProps['options']

export default function ProfileForm({ user }: ProfileFormProps) {
  const locations = cities as City[]

  const [open, setOpen] = useState(false)
  const [location, setLocation] = useState('')
  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState<Options>(
    locations.slice(0, 50).map(item => ({
      label: item.name,
      value: item.name,
    })),
  )

  const worker = useRef<Worker>()

  const handleInput = useMemo(() => {
    return debounce((query: string) => {
      if (query.length < 3) {
        setLoading(false)
        return
      }

      setLoading(true)
      worker.current?.postMessage({ query, cities })
    }, 1000)
  }, [])

  useEffect(() => {
    const path = '/workers/city-worker.js'
    const url = new URL(path, window ? window.location.origin : '/')

    const thread = new Worker(url)
    worker.current = thread

    thread.addEventListener('message', e => {
      setOptions(e.data as Options)
      setLoading(false)
    })

    return () => {
      thread.terminate()
    }
  }, [])

  return (
    <Fragment>
      <div className="mt-10 space-y-2 text-center">
        <h1 className="text-3xl font-medium">
          Tell us a little about{' '}
          {user?.role === 'BRAND' ? 'your Brand' : 'yourself'}
        </h1>
      </div>

      <form className="mx-auto mt-16 grid w-[70%] gap-8">
        {user?.role === 'BRAND' && (
          <Input
            placeholder="Stitches By Astra"
            label={<span className="text-lg">What is your brand name?</span>}
          />
        )}

        <div className="grid gap-2">
          <p className="flex items-center gap-2 text-lg">
            {user?.role === 'BRAND'
              ? 'Where is your brand located?'
              : 'What is your current location?'}
          </p>

          <Input
            onClick={() => setOpen(true)}
            placeholder="Enter to search locations"
            prepend={<Search className="mr-2 size-4 shrink-0 opacity-50" />}
          />

          <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput
              placeholder="Enter to search..."
              onValueChange={value => {
                setLoading(true)
                handleInput(value)
              }}
            />
            <CommandList>
              {loading ? (
                <div className="grid h-60 place-items-center">
                  <Spinner spinnerClass="size-4" />
                </div>
              ) : (
                <Fragment>
                  <CommandEmpty>No results found.</CommandEmpty>
                  {options.map((item, index) => (
                    <CommandItem
                      key={index + item.value}
                      className="!px-4"
                      onSelect={value => {
                        setOpen(false)
                        setLocation(value === location ? '' : value)
                      }}>
                      {item.label}
                    </CommandItem>
                  ))}
                </Fragment>
              )}
            </CommandList>
          </CommandDialog>
        </div>
      </form>
    </Fragment>
  )
}
