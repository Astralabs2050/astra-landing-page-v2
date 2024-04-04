'use client'

import React from 'react'
import { Button } from '../ui'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next-nprogress-bar'

interface DashboardHeaderProps {
  title: string
  subtitle: string
  backButton?: boolean | (() => void)
}

export const DashboardHeader = ({
  title,
  subtitle,
  backButton = true,
}: DashboardHeaderProps) => {
  const router = useRouter()

  return (
    <div className="flex items-center gap-3">
      {backButton && (
        <Button
          variant="ghost"
          size="icon"
          onClick={
            typeof backButton !== 'boolean' ? backButton : () => router.back()
          }>
          <ChevronLeft />
        </Button>
      )}

      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-lg text-gray-3">{subtitle}</p>
      </div>
    </div>
  )
}
