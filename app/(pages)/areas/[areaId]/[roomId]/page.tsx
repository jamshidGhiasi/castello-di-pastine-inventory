import AntiqueItem from "@/components/antique-item";
import SelectDemo from "@/components/area-change";
import Layout from "@/components/layout/layout";
import { ScrollArea } from "@/components/ui/scroll-area";
import fetchAntiques from "@/utils/fetchAntiques";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic'

const Room = async ({ params }: { params: { areaId: string, roomId: string } }) => {
    const { areaId, roomId } = params;
    const antiques = await fetchAntiques(areaId, roomId)


    return (
        <Layout>    

                <Link href={`/areas/${areaId}`} className="flex justify-self-start mr-auto mb-8">
                    <ChevronLeft className="w-6 h-6 cursor-pointer mr-2" />
                    Back to &nbsp;<span className="capitalize underline">{areaId.replace(/-/g,' ')}</span>
                </Link>
                <div className=" grid  grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 w-full">
                    {antiques &&
                        antiques.map((antique: any) =>
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
                                    height={antique.height}
                                    width={antique.white}
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
