import AreaItem from '@/components/area-item';
import Layout from '@/components/layout.tsx/layout'


export const dynamic = 'force-dynamic'

const Areas = async () => {
    const res = await fetch(`${process.env.API_BASE_URL}/areas`, { cache: 'no-store' });
    const areas = await res.json()

    return (
        <Layout>
         
          <div className='grid grid-cols-1 lg:grid lg:grid-cols-3 place-items-center place-content-center gap-3 w-full '>
            {areas.map((area: any) => (
              <AreaItem key={area.id} title={area.title} slug={area.slug} count={area._count.antiques}  />
            ))}
          </div>
     
        </Layout>
    )
}

export default Areas;
