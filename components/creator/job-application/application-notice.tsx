'use client'

import React from 'react'
import { Notice } from '@/components/common'
import { routes } from '@/constants/app-routes'
import { useRouter } from 'next/navigation'

export const ApplicationNotice = () => {
  const router = useRouter()

  return (
    <Notice
      title="Your Application has been successfully sent to the Job Creator!"
      subtitle="You will be notified when the brand has made a decision on your application."
      cta={{
        text: 'Go to Dashboard',
        action: async () => {
          router.push(routes.dashboard.base)
        },
      }}
    />
  )
}
