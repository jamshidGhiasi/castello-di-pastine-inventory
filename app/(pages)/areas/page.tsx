import AreaItem from '@/components/area-item';
import Layout from '@/components/layout.tsx/layout'

export const dynamic = 'force-dynamic'

async function getData() {
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/areas`, { cache: 'no-store' });

    console.log('jjj: API_BASE_URL', process.env.API_BASE_URL)
    console.log('jjj: res', res)
    console.log('jjj: res in string', JSON.stringify(res))

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }

    const result = await res.json()
    return result
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
