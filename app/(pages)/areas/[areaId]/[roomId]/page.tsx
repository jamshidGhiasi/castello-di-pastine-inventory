import AntiqueItem from "@/components/antique/antique-item";
import SelectDemo from "@/components/area/area-change";
import Layout from "@/components/layout/layout";
import { ScrollArea } from "@/components/ui/scroll-area";
import fetchAntiques from "@/utils/fetchAntiques";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import {AntiqueFromGoogleSheets} from '@/types/Antique';

export const dynamic = 'force-dynamic'

const Room = async ({ params }: { params: { areaId: string, roomId: string } }) => {
    const { areaId, roomId } = params;
    const antiques = await fetchAntiques(areaId, roomId)


    return (
        <Layout>
            <div className='sticky top-[79px] bg-[#f2f2f2] backdrop-blur-sm  border-b py-2 px-4 mb-4 w-full flex items-center justify-between z-10'>

            <Link href={`/areas/${areaId}`} className="flex justify-self-start mr-auto ">
                <ChevronLeft className="w-6 h-6 cursor-pointer mr-2" />
                Back to &nbsp;<span className="capitalize underline">{areaId.replace(/-/g, ' ')}</span>
            </Link>
            </div>
                <div className=" grid  grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 w-full p-4 pt-0">
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
                                width={antique.width}
                                depth={antique.depth}
                                area={areaId}
                                room={roomId}
                            />

                        )
                        )
                    }
                </div>


        </Layout>
    )
}
export default Room;
