import AreaItem from '@/components/area-item';
import Layout from '@/components/layout.tsx/layout'

export const dynamic = 'force-dynamic'

const Areas = async () => {
    const res = await fetch(`${process.env.VERCEL_URL}/api/areas`, { cache: 'no-store' });
    const areas = await res.json()

    return (
        <Layout>
          <div>
            {areas.map((area: any) => (
              <AreaItem key={area.id} title={area.title} slug={area.slug} count={area._count.antiques} />
            ))}
          </div>
        </Layout>
    )
}

export default Areas;
