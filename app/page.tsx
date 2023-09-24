import Image from 'next/image'

import HomeNavigation from '@/components/home-navigations'

export default function Home() {
  return (
    <main className="flex max-h-screen flex-col items-center justify-between p-6 z-10 relative">


      <div className="relative flex grow">
        <Image
          className=" relative"
          src="/castello-di-pastine-logo.svg"
          alt="Next.js Logo"
          width={244}
          height={266.55}
          priority
        />
      </div>

      
        <HomeNavigation navStyles='flex flex-col justify-between grow' />
     
    </main>
  )
}
