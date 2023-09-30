import SelectDemo from '@/components/area/area-change';
import Layout from '@/components/layout/layout'
import RoomItem from '@/components/room/room-item';
import { ScrollArea } from "@/components/ui/scroll-area"
import fetchRooms from '@/utils/fetchRooms';
import { ChevronRight, Home} from 'lucide-react';
import Link from 'next/link';
export const dynamic = 'force-dynamic'
const Area = async ({ params }: { params: { areaId: string } }) => {
    const { areaId } = params;
    const area = await fetchRooms(areaId)
    return (
        <Layout>
            <div className='sticky top-[79px] bg-[#fff] min-h-[46px]  border-b py-2 px-4 mb-2 flex items-center justify-between shadow-sm w-full  mx-auto '>
                <div className='text-xs w-full max-w-5xl mx-auto flex items-center'>
                    <Link href='/' className='hover:underline'>
                        <Home className='inline-block w-4' />
                    </Link>
                    <ChevronRight className='inline-block w-4' />
                    <Link href='/areas' className='hover:underline' >Areas</Link>
                    <ChevronRight className='inline-block w-4' />
                    <Link href='/areas' className=' capitalize pointer-events-none' >{areaId.replace(/-/g, ' ')}</Link>
                </div>
            </div>
            <div className='sticky top-[79px] bg-[#f2f2f2]  border-b py-2 px-4 mb-4 w-full max-w-5xl mx-auto  pt-0 flex items-center justify-between'>
                <h1 className='font-bold sm:text-lg '>Select a room</h1>
                <SelectDemo areaId={areaId as string} />
            </div>
            {!area && <div>oops! It looks like there are not data for {areaId} yet. </div>}
            <div className=' grid grid-cols-1 lg:grid lg:grid-cols-3 place-items-center place-content-center gap-3  w-full max-w-5xl mx-auto  px-4 pt-0'>
                {area && area.rooms.map((room: any) => (
                    <RoomItem key={room.id} title={room.title} slug={room.slug} count={room._count.antiques} isDisabled={(room._count.antiques == '0') ? true : false} areaId={areaId} roomNumber={room.title.match(/^(\d+).*/)?.[1]} />
                ))}
            </div>
        </Layout>
    )
}
export default Area;
