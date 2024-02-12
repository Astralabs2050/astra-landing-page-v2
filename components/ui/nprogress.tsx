'use client'

import React from 'react'
import { AppProgressBar } from 'next-nprogress-bar'

export const Nprogress = () => {
  return (
    <AppProgressBar
      color="#000000"
      shallowRouting
      delay={1000}
      options={{ showSpinner: false }}
    />
  )
}
