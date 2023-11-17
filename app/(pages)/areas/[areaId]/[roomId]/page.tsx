import AntiqueItem from "@/components/antique/antique-item";
import Layout from "@/components/layout/layout";
import fetchAntiques from "@/utils/fetchAntiques";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import fetchRoom from "@/utils/fetchRoom";
import RoomSchemeItem from "@/components/antique/room-scheme-item";

export const dynamic = 'force-dynamic'

const Room = async ({ params }: { params: { areaId: string, roomId: string } }) => {
    const { areaId, roomId } = params;
    const antiques = await fetchAntiques(areaId, roomId)
    const room = await fetchRoom(roomId)

    return (
        <Layout>
            <div className='sticky top-[79px] bg-[#fff] min-h-[46px]  border-b py-2 mb-4 px-4 flex items-center justify-between shadow-sm w-full  mx-auto z-20 '>
                <div className='text-xs w-full max-w-5xl mx-auto flex items-center'>
                    <Link href='/' className='hover:underline'>
                        <Home className='inline-block w-4' />
                    </Link>
                    <ChevronRight className='inline-block w-4' />
                    <Link href='/areas' className='hover:underline' >Areas</Link>
                    <ChevronRight className='inline-block w-4' />
                    <Link href={`/areas/${areaId}`} className=' capitalize ' >{areaId.replace(/-/g, ' ')}</Link>
                    <ChevronRight className='inline-block w-4' />
                    <Link href='/areas' className=' capitalize pointer-events-none' >{roomId.replace(/-/g, ' ').replace('%26', '&')}</Link>
                </div>
            </div>


            <div className=" grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 w-full p-4 pt-0  max-w-5xl mx-auto">
                {/* Room.scheme? */}
                <RoomSchemeItem room={room} />

                {/* Room.antiques */}
                {antiques &&
                    antiques.map((antique: any, i) =>
                    (
                        <AntiqueItem
                            key={antique.id}
                            description={antique.description}
                            image={
                                [
                                    `/antiques/image${antique.itemNo.replace(/^0/, '').replace('a','').replace('b','')}.jpg`,
                                ]
                            }
                            itemNo={antique.itemNo}
                            prevItemNo={antiques[i - 1]?.itemNo}
                            nextItemNo={antiques[i + 1]?.itemNo}
                            height={antique.height}
                            width={antique.width}
                            depth={antique.depth}
                            area={antique.area.title}
                            room={antique.room.title}
                        />

                    )
                    )
                }
            </div>


        </Layout>
    )
}
export default Room;
