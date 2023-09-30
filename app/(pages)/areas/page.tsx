import AreaItem from '@/components/area/area-item';
import Layout from '@/components/layout/layout'
import { ScrollArea } from '@/components/ui/scroll-area';
import fetchAreas from '@/utils/fetchAreas';
import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';


export const dynamic = 'force-dynamic'

const Areas = async () => {

  const areas = await fetchAreas();

  return (
    <Layout>
     <div className='sticky top-[79px] bg-[#fff] min-h-[46px]  border-b py-2 px-4 mb-4 flex items-center justify-between shadow-sm w-full  mx-auto '>
       <div className='text-xs w-full max-w-5xl mx-auto flex items-center'>
          <Link href='/' className='hover:underline'>
            <Home className='inline-block w-4' />
          </Link>
          <ChevronRight className='inline-block w-4' />
          <Link href='/areas' className=' pointer-events-none' >Areas</Link>
       </div>
     </div>
      <div className='grid grid-cols-1 lg:grid lg:grid-cols-3 place-items-center place-content-center gap-3  w-full max-w-5xl mx-auto  px-4 pt-0'>
        {!areas && <div>Error while getting Areas</div>}
        {areas && areas.map((area: any) => (
          <AreaItem key={area.id} title={area.title} slug={area.slug} count={area._count.antiques} />
          ))}
      </div>
  

    </Layout>
  )
}

export default Areas;
