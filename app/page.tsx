import Image from 'next/image'

import HomeNavigation from '@/components/home/home-navigations'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 z-10 relative">


      <div className="relative grow flex flex-col items-center justify-center ">
        <Image
          className=" relative"
          src="/cdp-logo.png"
          alt="Castello Di Pastine logo"
          width={183}
          height={309}
          priority
        />
      </div>

      
        <HomeNavigation navStyles='flex flex-col justify-between grow mb-auto' />
     
    </main>
  )
}
