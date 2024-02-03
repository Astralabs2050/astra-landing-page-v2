import { routes } from '@/constants/app-routes'
import { handleAuth, handleCallback } from '@auth0/nextjs-auth0'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

export const GET = handleAuth({
  async callback(req: NextApiRequest, res: NextApiResponse) {
    try {
      await handleCallback(req, res)
    } catch (err) {
      const error = err as { status: number; message: string }
      const isVerificationError = error.message.includes('verify your email')

      return NextResponse.redirect(
        new URL(
          isVerificationError ? routes.verifyEmail : routes.base,
          req.url,
        ),
      )
    }
  },
})
