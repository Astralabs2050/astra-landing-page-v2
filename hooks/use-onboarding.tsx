/* eslint-disable react-hooks/exhaustive-deps */

import cities from 'cities.json'
import { useEffect, useMemo, useRef, useState } from 'react'
import { City } from '@/types/models'
import { debounce } from 'lodash'
import { api } from '@/services/trpc-client'
import { useStore } from '@nanostores/react'
import { $onboarding } from '@/store/onboarding'

export const useOnboarding = () => {
  const [open, setOpen] = useState(false)
  const [loadingCities, setLoadingCities] = useState(false)
  const [options, setOptions] = useState<City[]>([])

  const worker = useRef<Worker>()
  const onboarding = useStore($onboarding)

  const { mutateAsync: createBrand, isLoading } = api.brand.update.useMutation()

  const saveBrandProfile = async () => {
    if (!onboarding.location) {
      throw new Error('Please select a location')
    }

    await createBrand({
      name: onboarding.name,
      bio: onboarding.bio,
      location: {
        ...onboarding.location,
        countryCode: onboarding.location.country,
      },
    })

    $onboarding.setKey('submitted', true)
  }

  const handleInput = useMemo(() => {
    return debounce((query: string) => {
      if (query.length < 3) {
        setLoadingCities(false)
        return
      }

      setLoadingCities(true)
      worker.current?.postMessage({ query, cities })
    }, 1000)
  }, [])

  useEffect(() => {
    const path = '/workers/city-worker.js'
    const url = new URL(path, window ? window.location.origin : '/')

    const thread = new Worker(url)
    worker.current = thread

    thread.addEventListener('message', e => {
      setOptions(e.data as City[])
      setLoadingCities(false)
    })

    if (!options.length) {
      handleInput('london')
    }

    return () => {
      thread.terminate()
    }
  }, [])

  return {
    open,
    setOpen,
    options,
    handleInput,
    loadingCities,
    setLoadingCities,
    saveBrandProfile,
    ...onboarding,
    submitting: isLoading,
    setFormValue: $onboarding.setKey,
  }
}
