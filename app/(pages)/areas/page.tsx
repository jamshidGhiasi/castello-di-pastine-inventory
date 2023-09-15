import AreaItem from '@/components/area-item';
import Layout from '@/components/layout.tsx/layout'

export const dynamic = 'force-dynamic'

async function getData() {
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/areas`, { cache: 'no-store' });

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }

    return res.json()
  } catch (err) {
  	console.error('Error caught at getData():', err)
    return []
  }
}

const Areas = async () => {
    const areas = await getData()

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
