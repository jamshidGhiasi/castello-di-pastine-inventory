import AntiqueItem from "@/components/antique-item";
import SelectDemo from "@/components/area-change";
import Layout from "@/components/layout/layout";
import { ScrollArea } from "@/components/ui/scroll-area";
const Room = async ({ params }: { params: { areaId: string, roomId: string } }) => {
    const { areaId, roomId } = params;
    const res = await fetch(`${process.env.API_BASE_URL}/areas/${areaId}/${roomId}`, { cache: 'no-store' });
    const antiques = await res.json()


    return (
        <Layout>
            <h2 className='mb-2'>Change room</h2>

            <h2 className=' my-4'>Select an item</h2>
            <ScrollArea className='h-[60vh] w-[90vw]'>
                <div className=" grid  grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 content-stretch">
                    {antiques &&
                        antiques.map((antique: any) =>
                        (
                            <div key={antique.id} className="bg-white flex flex-col  items-center justify-center rounded-md overflow-hidden h-[150px]">
                                <AntiqueItem
                                    description={antique.description}
                                    image={
                                        [
                                            `/antiques/image${antique.itemNo.replace('0', '')}.png`,
                                            `/antiques/image${antique.itemNo.replace('0', '')}-1.png`,
                                            `/antiques/image${antique.itemNo.replace('0', '')}-2.png`,
                                        ]
                                    }
                                    qr=""
                                    itemNo={antique.itemNo}
                                    height={antique.height}
                                    width={antique.white}
                                    depth={antique.depth}
                                    area={areaId}
                                    room={roomId}
                                />
                            </div>
                        )
                        )
                    }
                </div>
            </ScrollArea>
        </Layout>
    )
}
export default Room;
