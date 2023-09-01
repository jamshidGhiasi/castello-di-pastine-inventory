import Image from 'next/image'

import HomeNavigation from '@/components/home-navigations'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 z-10 relative">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
  

      </div>

      <div className="relative flex place-items-center ">
        <Image
          className="relative"
          src="/castello-di-pastine-logo.svg"
          alt="Next.js Logo"
          width={244}
          height={266.55}
          priority
        />
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-1 lg:text-left">
        <HomeNavigation />
      </div>
    </main>
  )
}
