'use client'

import React from 'react'
import { Button, ButtonProps } from '../ui'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next-nprogress-bar'

export const BackButton = ({ onClick }: ButtonProps) => {
  const router = useRouter()
  return (
    <Button
      variant="ghost"
      className="pl-4 pr-8"
      onClick={() => onClick ?? router.back()}>
      <ArrowLeft className="h-4" /> Go Back
    </Button>
  )
}
