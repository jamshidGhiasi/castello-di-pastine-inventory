import SelectDemo from '@/components/area-change';
import Layout from '@/components/layout/layout'
import RoomItem from '@/components/room-item';
import { ScrollArea } from "@/components/ui/scroll-area"
import fetchRooms from '@/utils/fetchRooms';

export const dynamic = 'force-dynamic'

const Area = async ({ params }: { params: { areaId: string } }) => {
    const { areaId } = params;
    const area = await fetchRooms(areaId)


    return (


        <Layout>
            <SelectDemo areaId={areaId as string} />
            {!area && <div>oops! It looks like there are not data for {areaId} yet. </div>}

           

            <div className=' grid grid-cols-1 lg:grid lg:grid-cols-3 place-items-center place-content-center gap-3  w-full '>

                {area && area.rooms.map((room: any) => (
                    <RoomItem key={room.id} title={room.title} slug={room.slug} count={room._count.antiques} areaId={areaId} roomNumber={room.title.match(/^(\d+).*/)[1]} />
                ))}
            </div>


        </Layout>

    )
}
export default Area;
