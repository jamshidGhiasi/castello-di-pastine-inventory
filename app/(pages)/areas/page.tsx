import AreaItem from '@/components/area-item';
import Layout from '@/components/layout.tsx/layout'
import Link from 'next/link';

const Areas = async () => {
    const res = await fetch('http://localhost:3000/api/areas');
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