import React, { PropsWithChildren } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '../ui'
import { Logo } from './logo'
import { Design } from '@/types/models'
import { format } from 'date-fns'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { baseSepolia } from 'viem/chains'

export const OnChainCert = ({
  children,
  name,
  prompt,
  promptResults,
  sketches,
  createdAt,
  txHash,
}: PropsWithChildren & Partial<Design>) => {
  const images = promptResults?.length ? promptResults : sketches

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="lg:max-w-[750px]">
        <DialogHeader className="flex flex-col items-center justify-center">
          <Logo className="w-32" />
          <h2 className="text-2xl font-semibold">On-chain Certificate</h2>
        </DialogHeader>

        <div className="mt-10 space-y-8">
          <div className="flex justify-between">
            <div>
              <p className="text-sm">Brand Name</p>
              <p className="text-base font-semibold">{name}</p>
            </div>

            {createdAt && (
              <div>
                <p className="text-sm">Date Issued</p>
                <p className="text-base font-semibold">
                  {format(createdAt, 'dd, MMMM yyyy')}
                </p>
              </div>
            )}
          </div>

          <div>
            <p className="text-sm">AI Prompt</p>
            <p className="text-base font-semibold">{prompt ?? 'NIL'}</p>
          </div>

          <div>
            <p className="mb-2 text-sm">Prompt Results</p>
            <div className="grid w-fit grid-cols-4 gap-2">
              {images?.map((item, index) => (
                <Image
                  key={index}
                  alt="Prompt Result"
                  width={166}
                  height={195}
                  className="h-auto w-[10.4rem]"
                  src={typeof item === 'string' ? item : item.url}
                />
              ))}
            </div>
          </div>

          <div>
            <Link
              target="_blank"
              href={`https://sepolia.basescan.org/tx/${txHash}`}>
              <p className="flex items-center space-x-1 text-base font-semibold">
                <ExternalLink className="size-4" />
                <span>View On Block Explorer</span>
              </p>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
