import Layout from "@/components/layout/layout";
import AntiqueItem from "@/components/antique-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import fetchAntiquesByCategory from "@/utils/fetchAntiquesByCategory";

export const dynamic = 'force-dynamic'

const Category = async ({ params }: { params: { categoryId: string } }) => {
    const { categoryId } = params;
    const antiques = await fetchAntiquesByCategory(categoryId)
    return (
        <Layout>
            <Link href={`/categories`} className="flex justify-self-start mr-auto mb-4">
                <ChevronLeft className="w-6 h-6 cursor-pointer mr-2" />
                Back to Categories
            </Link>
            <ScrollArea className='w-full h-[calc(100vh-200px)]'>
            <div className=" grid  grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 w-full mb-[110px] sm:mb-[180px]">
                {antiques &&
                    antiques.map((antique: any, i) =>
                    (
                        <AntiqueItem
                            key={antique.id}
                            description={antique.description}
                            image={
                                [
                                    `/antiques/image${antique.itemNo.replace('0', '')}.png`,
                                    `/antiques/image${antique.itemNo.replace('0', '')}-1.png`,
                                    `/antiques/image${antique.itemNo.replace('0', '')}-2.png`,
                                ]
                            }
                            itemNo={antique.itemNo}
                            prevItemNo={antiques[i - 1]?.itemNo}
                            nextItemNo={antiques[i + 1]?.itemNo}
                            height={antique.height}
                            width={antique.white}
                            depth={antique.depth}
                            area={antique.areaId}
                            room={antique.roomId}
                        />
                    )
                    )
                }
            </div>
            </ScrollArea>
        </Layout>
    )
}
export default Category;
