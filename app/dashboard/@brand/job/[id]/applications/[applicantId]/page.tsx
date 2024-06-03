import Image from 'next/image'
import Link from 'next/link'
import { Collapsible, DashboardHeader } from '@/components/common'
import { trpcCaller } from '@/server/utils'
import { Scale, Lock, Expand, MapPin, Mail } from 'lucide-react'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui'

export default async function JobApplicants({
  params,
}: {
  params: { id: string; applicantId: string }
}) {
  const trpc = await trpcCaller()
  const application = await trpc.job.getApplication({
    jobId: params.id,
    applicantId: decodeURI(params.applicantId),
  })

  if (!application) {
    return notFound()
  }

  return (
    <div className="space-y-12">
      <DashboardHeader
        title="Application Details"
        subtitle="View creator's application"
      />

      <div className="space-y-12 rounded-3xl border border-gray-6 p-10">
        <div className="flex flex-col items-center justify-center">
          <span className="grid size-20 place-items-center rounded-full border-4 border-white bg-gray-3 text-white">
            <p className="text-2xl font-semibold leading-none">
              {application.applicant.name.slice(0, 1)}
            </p>
          </span>
          <p className="text-2xl font-semibold">{application.applicant.name}</p>
          <p className="text-gray-3">
            {application.applicant.owner.role === 'DESIGNER'
              ? '3D Artist, Designer'
              : 'Outfit Manufacturer'}{' '}
          </p>

          <div className="mt-6 flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <MapPin className="size-4 text-gray-2" />
              <p className=" text-gray-3">
                {application.applicant.city},{' '}
                {application.applicant.countryCode}
              </p>
            </div>

            <Link
              href={`mailto:${application.applicant.email}`}
              className="group flex items-center space-x-2">
              <Mail className="size-4 text-gray-2 group-hover:text-blue-1" />
              <p className="text-gray-3 group-hover:text-blue-1">
                {application.applicant.email}
              </p>
            </Link>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-gray-3">About Creator:</h4>
          <p className="tracking-wider text-gray-2">
            {application.applicant.bio}
          </p>
        </div>

        <Collapsible title="Payment Terms">
          <div className="space-y-10 py-4">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-lg font-medium">Creator Charges</p>
                <p className="text-gray-3">
                  This amount may differ from final prices after negotiations
                </p>
              </div>

              <div>
                <p className="text-2xl font-medium">
                  ${application.applicantCharge}
                </p>
              </div>
            </div>

            {application.openToNegotiations ? (
              <div className="flex items-center gap-3 text-blue-1">
                <Scale className="size-5" />
                <p className="text-lg"> Creator is open for negotiations </p>
              </div>
            ) : (
              <div className="flex items-center gap-3 text-yellow-700">
                <Lock className="size-5" />
                <p className="text-lg">
                  Creator&apos;s charge is non negotiatiable{' '}
                </p>
              </div>
            )}
          </div>
        </Collapsible>

        <div className="space-y-4">
          <h4 className="text-xl font-medium">
            View {application.applicant.name}&apos;s Projects
          </h4>

          <div className="grid grid-cols-4 gap-6">
            {application.applicant.CreatorWork.map((item, index) => (
              <div
                key={index}
                className="group relative h-[17.4rem] cursor-pointer overflow-hidden rounded-lg">
                <Image
                  fill
                  alt={item.title}
                  src={item.shots[0]}
                  className="w-full  object-cover"
                />

                <span className="absolute inset-0 grid place-items-center bg-black/50 text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <Expand className="size-8" />
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            radii="pill"
            size="lg"
            className="border-destructive text-destructive hover:text-destructive">
            Decline
          </Button>
          <Link href={'/payment'}>
            <Button radii="pill" size="lg">
              Pay Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
