import { Logo } from '@/components/common'
import { CreatorWorks, Roles, Stepper } from '@/components/onboarding'
import ProfileForm from '@/components/onboarding/profile-form'
import { Button } from '@/components/ui/button'
import { trpcCaller } from '@/server/utils'
import { ArrowLeft } from 'lucide-react'
import { redirect } from 'next/navigation'
import { getSession } from '@auth0/nextjs-auth0'
import { Fragment } from 'react'
import Link from 'next/link'
import { routes } from '@/constants/app-routes'

export default async function Home() {
  const session = await getSession()

  const trpc = await trpcCaller()
  const roles = await trpc.user.getRoles()
  const user = await trpc.user.get()

  async function onboardingProgress() {
    if (user && user.role === 'BRAND') {
      const brand = await trpc.brand.get()
      return brand ? 'completed' : 2
    }

    if (user && (user.role === 'DESIGNER' || user.role === 'MANUFACTURER')) {
      const creator = await trpc.creator.get()
      const work = await trpc.creator.getWorkSamples()

      return work.length ? 'completed' : creator ? 3 : 2
    }

    return 1
  }

  const progress = await onboardingProgress()
  const Cta = progress === 1 ? Link : Fragment

  if (progress === 'completed') {
    return redirect('/dashboard')
  }

  return (
    <main className="flex min-h-screen w-screen flex-col bg-gray-6">
      <header className="sticky top-0 z-20 flex h-header items-center justify-between bg-gray-6 px-12">
        <Logo />
      </header>
      <div className="relative mx-[8.3rem] mb-[2.8rem] grow bg-white px-6 py-16">
        <div className="mb-6 grid grid-cols-3 place-items-start">
          <Cta href={routes.logout}>
            <Button variant="ghost" className="pr-10">
              <ArrowLeft className="h-4" />{' '}
              {progress === 1 ? 'Logout' : 'Go Back'}
            </Button>
          </Cta>
          <div className="grid w-full place-items-center">
            <Stepper
              current={progress}
              count={
                user?.role !== 'DESIGNER' && user?.role !== 'MANUFACTURER'
                  ? 2
                  : 3
              }
            />
          </div>
          <span />
        </div>
        {
          [
            <Roles key={1} roles={roles} session={session} />,
            <ProfileForm key={2} user={user} />,
            <CreatorWorks key={3} />,
          ][progress - 1]
        }
      </div>
    </main>
  )
}
