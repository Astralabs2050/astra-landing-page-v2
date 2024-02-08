import { Logo } from '@/components/common'
import { Roles, Stepper } from '@/components/onboarding'
import ProfileForm from '@/components/onboarding/profile-form'
import { Button } from '@/components/ui/button'
import { trpcCaller } from '@/server/utils'
import { ArrowLeft } from 'lucide-react'
import { redirect } from 'next/navigation'

export default async function Home() {
  const trpc = await trpcCaller()
  const roles = await trpc.user.getRoles()
  const user = await trpc.user.get()

  async function onboardingProgress() {
    if (user && user.role === 'BRAND') {
      const brand = await trpc.brand.getUserBrand()
      return brand ? 'completed' : 2
    }

    return 1
  }

  const progress = await onboardingProgress()

  if (progress === 'completed') {
    return redirect('/dashboard')
  }

  return (
    <main className="flex h-screen w-screen flex-col bg-gray-6">
      <header className="flex h-[var(--header-height)] items-center justify-between px-12">
        <Logo />
      </header>
      <div className="mx-[8.3rem] mb-[2.8rem] grow bg-white px-6 py-16">
        <div className="mb-6 grid grid-cols-3 place-items-start">
          <Button variant="ghost">
            <ArrowLeft className="h-4" /> Go Back
          </Button>
          <div className="grid w-full place-items-center">
            <Stepper
              current={progress}
              count={
                user?.role !== 'DESIGNER' && user?.role !== 'MANUFACTURER'
                  ? 2
                  : 4
              }
            />
          </div>
          <span />
        </div>
        {
          [
            <Roles key={1} roles={roles} />,
            <ProfileForm key={2} user={user} />,
          ][progress - 1]
        }
      </div>
    </main>
  )
}
