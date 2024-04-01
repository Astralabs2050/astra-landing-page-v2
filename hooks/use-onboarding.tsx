/* eslint-disable react-hooks/exhaustive-deps */

import cities from 'cities.json'
import { useEffect, useMemo, useRef, useState } from 'react'
import { City } from '@/types/models'
import { debounce } from 'lodash'
import { api } from '@/services/trpc-client'
import { useStore } from '@nanostores/react'
import { $onboarding } from '@/store/onboarding'
import { useRouter } from 'next-nprogress-bar'

export const useOnboarding = () => {
  const [open, setOpen] = useState(false)
  const [currentWork, setCurrentWork] = useState<number>()
  const [loadingCities, setLoadingCities] = useState(false)
  const [options, setOptions] = useState<City[]>([])

  const router = useRouter()
  const worker = useRef<Worker>()
  const onboarding = useStore($onboarding)

  const { mutateAsync: createBrand, isLoading } = api.brand.update.useMutation()
  const { mutateAsync: createCreator, isLoading: loadingCreator } =
    api.creator.updateBasicProfile.useMutation()

  const { mutateAsync: saveWork, isLoading: savingWork } =
    api.creator.saveWorkSamples.useMutation()

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

  const saveCreatorProfile = async () => {
    if (!onboarding.location) {
      throw new Error('Please select a location')
    }

    await createCreator({
      name: onboarding.name,
      bio: onboarding.bio,
      location: {
        ...onboarding.location,
        countryCode: onboarding.location.country,
      },
    })

    router.refresh()
  }

  const saveCreatorSamples = async () => {
    await saveWork({ samples: onboarding.works })
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

  useEffect(() => {
    if (currentWork !== undefined) {
      if (!onboarding.works[currentWork]) {
        $onboarding.setKey('works', [
          ...onboarding.works,
          {
            title: '',
            description: '',
            shots: [],
          },
        ])
      }
    } else {
      const works = onboarding.works.filter(item => {
        return !!item.title && !!item.shots.length
      })

      $onboarding.setKey('works', works)
    }
  }, [currentWork])

  return {
    open,
    setOpen,
    options,
    currentWork,
    setCurrentWork,
    handleInput,
    loadingCities,
    setLoadingCities,
    saveBrandProfile,
    ...onboarding,
    saveCreatorProfile,
    saveCreatorSamples,
    setFormValue: $onboarding.setKey,
    submitting: isLoading || loadingCreator || savingWork,
  }
}
