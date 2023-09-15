import SelectDemo from '@/components/area-change';
import Layout from '@/components/layout.tsx/layout'
import RoomItem from '@/components/room-item';
import { ScrollArea } from "@/components/ui/scroll-area"

const Area = async ({ params }: { params: { areaId: string } }) => {
    const { areaId } = params;
    const res = await fetch(`${process.env.VERCEL_URL}/api/areas/${areaId}`, { cache: 'no-store' });
    const { rooms } = await res.json()
    return (


        <Layout>
            <h2 className='mb-2'>Change area</h2>
            <SelectDemo  areaId={areaId as string}/>
            <h2 className=' my-4'>Select a room</h2>
            <ScrollArea className='h-[60vh] w-[90vw]'>

            {rooms.map((room: any) => (
                <RoomItem key={room.id} title={room.title} slug={room.slug} count={room._count.antiques} areaId={areaId} roomNumber={room.roomNo} />
            ))}
            </ScrollArea>

        </Layout>

    )
}
export default Area;
