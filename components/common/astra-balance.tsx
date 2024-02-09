import React from 'react'
import { Button } from '../ui'
import { LogoMark } from '.'

export const AstraBalance = () => {
  return (
    <Button variant="ghost" radii="pill" className="space-x-2 bg-accent px-8">
      <LogoMark className="size-8" />
      <span className="font-mono font-light">0.00</span>
      <span className="text-lg font-medium">ASTRAS</span>
    </Button>
  )
}
