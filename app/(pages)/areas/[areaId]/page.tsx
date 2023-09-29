import SelectDemo from '@/components/area/area-change';
import Layout from '@/components/layout/layout'
import RoomItem from '@/components/room/room-item';
import { ScrollArea } from "@/components/ui/scroll-area"
import fetchRooms from '@/utils/fetchRooms';
export const dynamic = 'force-dynamic'
const Area = async ({ params }: { params: { areaId: string } }) => {
    const { areaId } = params;
    const area = await fetchRooms(areaId)
    return (
        <Layout>
            <div className='sticky top-[79px] bg-[#f2f2f2/80] backdrop-blur-sm  border-b py-2 px-4 mb-4 w-full flex items-center justify-between'>
                <h1 className='font-bold sm:text-lg '>Select a room</h1>
                <SelectDemo areaId={areaId as string} />
            </div>
            {!area && <div>oops! It looks like there are not data for {areaId} yet. </div>}
            <div className=' grid grid-cols-1 lg:grid lg:grid-cols-3 place-items-center place-content-center gap-3  w-full p-4 pt-0'>
                {area && area.rooms.map((room: any) => (
                    <RoomItem key={room.id} title={room.title} slug={room.slug} count={room._count.antiques} areaId={areaId} roomNumber={room.title.match(/^(\d+).*/)[1]} />
                ))}
            </div>
        </Layout>
    )
}
export default Area;
