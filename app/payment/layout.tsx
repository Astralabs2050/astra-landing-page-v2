import React, { PropsWithChildren } from 'react'
import { Header } from '@/components/common'
import { redirect } from 'next/navigation'
import { getUser } from '@/server/actions/user'
import { Payment } from './payment'

// Define the props type
interface PaymentLayoutProps {
  brand: React.ReactNode
  creator: React.ReactNode
}

export default async function PaymentLayout({
  brand,
  creator,
}: PaymentLayoutProps) {
  const user = await getUser()

  if (!user?.onboarded) {
    return redirect('/')
  }

  return (
    <div className="flex w-screen flex-col">
      <main className="flex min-h-screen w-full grow flex-col">
        <Header user={user} />
        <div className="m-auto flex items-center justify-center">
          <Payment user={user} />
          <div className="border-l border-solid border-gray-6 p-10">
            {user?.role === 'BRAND' ? brand : creator}
          </div>
        </div>
      </main>
    </div>
  )
}

// export default async function PaymentLayout({
//   brand,
//   creator,
// }: PaymentLayoutProps) {
//   const user = await getUser()

//   if (!user?.onboarded) {
//     return redirect('/')
//   }

//   return (
//     <div className="flex w-screen flex-col">
//       <main className="flex min-h-screen w-full grow flex-col">
//         <Header user={user} />
//         <div className="m-auto flex items-center justify-center">
//           <Payment user={user} />
//           <div className="border-l border-solid border-gray-6 p-10">
//             {user?.role === 'BRAND' ? brand : creator}
//           </div>
//         </div>
//       </main>
//     </div>
//   )
// }
