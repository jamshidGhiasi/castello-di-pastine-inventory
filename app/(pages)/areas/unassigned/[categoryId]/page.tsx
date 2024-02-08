import AntiqueItem from "@/components/antique/antique-item";
import Layout from "@/components/layout/layout";
import fetchUnassignedByCategory from "@/utils/fetchUnassignedByCategory";
import fetchUnassignedWithCategories from "@/utils/fetchUnassignedWithCategories";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

const UnassignedAntiqueCategory = async({ params }: { params: { categoryId: string } }) => {
    const { categoryId } = params;
    const antiques = await fetchUnassignedByCategory(categoryId);
    const antiquesByCategory = await fetchUnassignedWithCategories()

    return (
        <Layout>
            <div className='sticky top-[79px] bg-[#fff] min-h-[46px]  border-b py-2 px-4 mb-4 flex items-center justify-between shadow-sm w-full  mx-auto z-20 '>
                <div className='text-xs w-full max-w-5xl mx-auto flex items-center'>
                    <Link href='/' className='hover:underline'>
                        <Home className='inline-block w-4' />
                    </Link>
                    <ChevronRight className='inline-block w-4' />
                    <Link href='/areas' className='hover:underline'>
                        Areas
                    </Link>
                    <ChevronRight className='inline-block w-4' />
                    <Link href='/areas/unassigned'  className='hover:underline' >Unassigned</Link>
                    <ChevronRight className='inline-block w-4' />
                    <Link href='/unassigned' className=' capitalize pointer-events-none' >{categoryId.replace(/-/g, ' ')}</Link>
                </div>
            </div>
            <div>

                <div className="w-full max-w-5xl mx-auto gap-1 px-4 pt-0 ">
                    <h3 className=" font-bold text-md mb-4">Categories</h3>
                    <div className="flex justify-start gap-2 mb-4 overflow-x-auto">
                        <Link className=" inline-block bg-white px-4 py-2 rounded-full capitalize hover:bg-slate-500 hover:text-white " href={`/areas/unassigned`}> All </Link>
                        {antiquesByCategory &&
                            antiquesByCategory.map((antique: any, i) => (
                                <div key={i}>
                                    <Link className=" inline-block bg-white px-4 py-2 rounded-full capitalize hover:bg-slate-500 hover:text-white grow whitespace-nowrap justify-self-stretch" href={`/areas/unassigned/${antique.categoryId}`}> {antique.categoryId.replace(/-/g, ' ')} </Link>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className=" grid  grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 w-full max-w-5xl mx-auto  px-4 pt-0">
            
            {antiques &&
                antiques.map((antique: any, i) =>
                (

                    <AntiqueItem
                        key={antique.id}
                        description={antique.description}
                        image={
                            [
                                `/antiques/image${antique.itemNo.replace(/^0/, '').replace(/\D/g, "")}.jpg`,
                            ]
                        }
                        itemNo={antique.itemNo}
                        prevItemNo={antiques[i - 1]?.itemNo}
                        nextItemNo={antiques[i + 1]?.itemNo}
                        height={antique.height}
                        width={antique.white}
                        depth={antique.depth}
                        area={'unassigned'}
                        room={'unassigned'}
                    />

                )
                )
            }
        </div>
        </Layout>
    )
}

export default UnassignedAntiqueCategory