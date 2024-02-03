import { routes } from '@/constants/app-routes'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <header className="flex items-center justify-between px-6 py-3">
        <h1 className="text-2xl uppercase">Astra</h1>
        <Link href={routes.logout}>
          <button className="h-10 rounded-md bg-black px-8 font-medium text-white">
            Sign Out
          </button>
        </Link>
      </header>
    </main>
  )
}
