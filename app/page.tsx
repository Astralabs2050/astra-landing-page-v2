import { Logo } from '@/components/common'

export default function Home() {
  return (
    <main className="flex h-screen w-screen flex-col bg-gray-6">
      <header className="flex h-[var(--header-height)] items-center justify-between px-12">
        <Logo />
      </header>
      <div className="mx-[8.3rem] mb-[2.8rem] grow bg-white"></div>
    </main>
  )
}
