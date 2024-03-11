/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import React, { useEffect } from 'react'
import { Button, Spinner } from '../ui'
import { LogoMark } from '.'
import { useAccount, useContractRead, useContractWrite } from 'wagmi'
import { astraToken } from '@/abis'
import { formatUnits } from 'viem'
import { contracts } from '@/constants/contracts'

export const AstraBalance = () => {
  const { address } = useAccount()

  const { isLoading, data: balance } = useContractRead({
    abi: astraToken,
    address: contracts.token,
    functionName: 'balanceOf',
    args: [address],
  })

  const { data: allowance } = useContractRead({
    abi: astraToken,
    address: contracts.token,
    functionName: 'allowance',
    args: [address, contracts.nft],
  })

  const { writeAsync } = useContractWrite({
    abi: astraToken,
    address: contracts.token,
    functionName: 'increaseAllowance',
  })

  useEffect(() => {
    function checkNullish(value: unknown) {
      return value !== undefined && value !== null
    }

    const nonNull = checkNullish(allowance) && checkNullish(balance)

    if (nonNull) {
      const bigBalance = balance as bigint
      const bigAllowance = allowance as bigint

      const allowed = formatUnits(bigAllowance, 18)
      const bal = formatUnits(bigBalance, 18)

      if (allowed < bal) {
        writeAsync({ args: [contracts.nft, balance] })
      }
    }
  }, [allowance, balance])

  return (
    <Button variant="ghost" radii="pill" className="space-x-2 bg-accent px-8">
      <LogoMark className="size-8" />

      {isLoading || !address ? (
        <Spinner className="size-4" />
      ) : (
        <span className="font-mono font-light">
          {balance
            ? Number(formatUnits(balance as bigint, 18)).toFixed(4)
            : '0.00'}
        </span>
      )}

      <span className="text-lg font-medium">ASTRAS</span>
    </Button>
  )
}
