import AreaItem from '@/components/area-item';
import Layout from '@/components/layout/layout'
import { ScrollArea } from '@/components/ui/scroll-area';
import fetchAreas from '@/utils/fetchAreas';


export const dynamic = 'force-dynamic'

const Areas = async () => {

  const areas = await fetchAreas();

  return (
    <Layout>
     
      <div className='grid grid-cols-1 lg:grid lg:grid-cols-3 place-items-center place-content-center gap-3 w-full  '>
        {!areas && <div>Error while getting Areas</div>}
        {areas && areas.map((area: any) => {
          if (area.slug !== 'unassigned')
            return (
              <AreaItem key={area.id} title={area.title} slug={area.slug} count={area._count.antiques} />
            )
          else if (area.slug === 'unassigned') {
            return (
              <AreaItem key={area.id} title={area.title} slug={area.slug} count={area._count.antiques} />
            )

          }
        })}
      </div>
  

    </Layout>
  )
}

export default Areas;
