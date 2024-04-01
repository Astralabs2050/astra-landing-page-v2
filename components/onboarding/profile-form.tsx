/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import React, { Fragment } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@prisma/client'
import { Search } from 'lucide-react'
import { countries } from '@/constants/countries'
import { useOnboarding } from '@/hooks'
import { Notice } from '@/components/common'

import {
  Input,
  Spinner,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandDialog,
  Textarea,
  Button,
} from '../ui'

interface ProfileFormProps {
  user?: User | null
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const router = useRouter()

  const {
    open,
    setOpen,
    options,
    handleInput,
    location,
    loadingCities,
    setLoadingCities,
    setFormValue,
    name,
    bio,
    submitted,
    submitting,
    saveBrandProfile,
    saveCreatorProfile,
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
    <Fragment>
      <div className="mt-10 space-y-2 text-center">
        <h1 className="text-3xl font-medium">
          Tell us a little about{' '}
          {user?.role === 'BRAND' ? 'your Brand' : 'yourself'}
        </h1>
      </div>

      <form
        className="mx-auto mt-16 grid w-[60%] gap-8"
        onSubmit={e => {
          e.preventDefault()
          user?.role === 'BRAND' ? saveBrandProfile() : saveCreatorProfile()
        }}>
        <Fragment>
          <Input
            required
            value={name}
            onChange={e => setFormValue('name', e.target.value)}
            name="name"
            id="name"
            placeholder="Stitches by Astra"
            label={
              <span className="text-lg">
                What is your {user?.role === 'BRAND' ? 'brand' : ''} name?
              </span>
            }
          />
        </Fragment>

        <Textarea
          required
          value={bio}
          onChange={e => setFormValue('bio', e.target.value)}
          name="bio"
          id="bio"
          placeholder={
            user?.role === 'BRAND'
              ? 'Sticthes by Astra is a fashion...'
              : 'Write a bio'
          }
          label={
            <span className="text-lg">
              {user?.role === 'BRAND'
                ? 'How can you describe your brand?'
                : 'Tell us a little about yourself'}
            </span>
          }
        />

        <div className="grid gap-2">
          <p className="flex items-center gap-2 text-lg">
            {user?.role === 'BRAND'
              ? 'Where is your brand located?'
              : 'What is your current location?'}
          </p>

          <Input
            required
            readOnly
            onClick={() => setOpen(true)}
            name="location"
            id="location"
            placeholder="Enter to search locations"
            prepend={<Search className="mr-2 size-4 shrink-0 opacity-50" />}
            value={
              location
                ? `${location.name}, ${countries[location.country as keyof typeof countries]}`
                : ''
            }
          />

          <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput
              className="text-base"
              placeholder="Enter to search..."
              onValueChange={value => {
                setLoadingCities(true)
                handleInput(value)
              }}
            />
            <CommandList>
              {loadingCities ? (
                <div className="grid h-60 place-items-center">
                  <Spinner spinnerClass="size-4" />
                </div>
              ) : (
                <Fragment>
                  <CommandEmpty>No results found.</CommandEmpty>
                  {options.map((item, index) => (
                    <CommandItem
                      key={index + item.lat + item.lng}
                      value={item.name + item.country + item.admin1}
                      className="cursor-pointer border-b border-solid border-gray-6 !px-4"
                      onSelect={() => {
                        setOpen(false)
                        setFormValue('location', item)
                      }}>
                      <div className="w-full">
                        <p className="text-base font-medium">{item.name}</p>
                        <p className="text-sm">
                          {countries[item.country as keyof typeof countries]}
                        </p>
                      </div>
                    </CommandItem>
                  ))}
                </Fragment>
              )}
            </CommandList>
          </CommandDialog>
        </div>

        <Button
          type="submit"
          className="mx-auto mt-4 w-[60%]"
          disabled={submitting}>
          {submitting ? (
            <Spinner text="Submitting" spinnerClass="fill-black w-5 h-5" />
          ) : (
            'Proceed'
          )}
        </Button>
      </form>
    </Fragment>
  )
}
