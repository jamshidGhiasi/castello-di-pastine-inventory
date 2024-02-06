import Layout from "@/components/layout/layout";
import AntiqueItem from "@/components/antique/antique-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import fetchAntiquesByCategory from "@/utils/fetchAntiquesByCategory";

export const dynamic = 'force-dynamic'

const Category = async ({ params }: { params: { categoryId: string } }) => {
    const { categoryId } = params;
    const antiques = await fetchAntiquesByCategory(categoryId)
    return (
        <Layout>
            <div className='sticky top-[79px] bg-[#fff] min-h-[46px]  border-b py-2 px-4 mb-4 flex items-center justify-between shadow-sm w-full  mx-auto z-20 '>
                <div className='text-xs w-full max-w-5xl mx-auto flex items-center'>
                    <Link href='/' className='hover:underline'>
                        <Home className='inline-block w-4' />
                    </Link>
                    <ChevronRight className='inline-block w-4' />
                    <Link href='/categories'  className='hover:underline' >Categories</Link>
                    <ChevronRight className='inline-block w-4' />
                    <Link href='/categories' className=' capitalize pointer-events-none' >{categoryId.replace('-', ' ')}</Link>
                </div>
            </div>
           
            <div className="grid  grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 w-full p-4 pt-0  max-w-5xl mx-auto">
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
                            area={antique.areaId}
                            room={antique.room.title}
                            warehouseLocation = {antique.warehouseLocation}
                        />
                    )
                    )
                }
            </div>
  
        </Layout>
    )
}
export default Category;
