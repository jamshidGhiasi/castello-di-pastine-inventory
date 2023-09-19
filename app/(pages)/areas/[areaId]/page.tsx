import SelectDemo from '@/components/area-change';
import Layout from '@/components/layout.tsx/layout'
import RoomItem from '@/components/room-item';
import { ScrollArea } from "@/components/ui/scroll-area"

const Area = async ({ params }: { params: { areaId: string } }) => {
    const { areaId } = params;
    const res = await fetch(`${process.env.API_BASE_URL}/areas/${areaId}`, { cache: 'no-store' });
    const { rooms } = await res.json()
    return (


        <Layout>
            <SelectDemo  areaId={areaId as string}/>

            <div className=' grid grid-cols-1 lg:grid lg:grid-cols-3 place-items-center place-content-center gap-3 w-full'>

            {rooms.map((room: any) => (
                <RoomItem key={room.id} title={room.title} slug={room.slug} count={room._count.antiques} areaId={areaId} roomNumber={room.title.match(/^(\d+).*/)[1]} />
            ))}
            </div>

        </Layout>

    )
}
export default Area;
