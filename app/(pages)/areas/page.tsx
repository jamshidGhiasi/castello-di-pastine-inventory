import Layout from '@/components/layout.tsx/layout'
import Link from 'next/link';
const Areas = async () => {
    const res = await fetch('http://localhost:3000/api/areas');
    const areas = await res.json()
  

    return (
        <Layout>

            <div>
                
                <h1 className=" mb-4">
                    This is the <code className=" bg-slate-400 p-1 rounded-sm">/areas</code> and is public and shows all available areas
                </h1>

                <h2 className="mb-2 text-cyan-500">Components</h2>
                <p className=" left-0 top-0 flex flex-col w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                    <span>- Looped Area item</span>
                    { areas.map((area : any) => (
                        <>
                        <Link href={`/areas/${area.slug}`}>
                        { area.title}
                        </Link>
                        <br />
                        </>
                    ))}
                </p>
            </div>


        </Layout>
    )
}

export default Areas;