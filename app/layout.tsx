import '@/style/globals.css'

import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Providers } from '@/providers'
import { Nprogress } from '@/components/ui'

const clashGrotesk = localFont({
  src: [
    {
      path: '../public/fonts/ClashGrotesk-Variable.woff2',
      style: 'normal',
    },
  ],
})

export const metadata: Metadata = {
  title: 'Astra',
  description: 'Bring your fashion ideas to life',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={clashGrotesk.className}>
        <Nprogress />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
