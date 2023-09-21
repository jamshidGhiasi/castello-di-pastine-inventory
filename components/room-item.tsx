'use client'
import { Angry, CaseUpper, Castle, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
export const RoomItem = ({ title, areaId, slug, count, roomNumber }: { title: string, areaId: string, slug: string, count: string, roomNumber: string }) => {
    const router = useRouter();
    function handleAreaItemClick() {
        router.push(`/areas/${areaId}/${slug}`)
    }
    return (
        <Button className="group w-full py-4 sm:py-4 flex justify-between  items-center rounded-full  h-auto bg-white/40 " onClick={handleAreaItemClick}>
            {roomNumber &&
                <div className=" w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0 mr-4 bg-white group-hover:bg-lime-500">
                    {count}
                </div>
            }
            {!roomNumber &&
                <div className=" flex items-center justify-center rounded-full mr-4 bg-gray-800 group-hover:bg-lime-500">
                </div>
            }
            <div className="flex flex-col items-start justify-center mr-auto text-left">
                <span className="text-xs sm:text-sm font-bold text-white group-hover:text-black">
                    {title}
                </span>
            </div>
            <div className="w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0  bg-black text-yellow-50 ml-auto group-hover:text-lime-500">
                <ChevronRight />
            </div>
        </Button>
    )
}
export default RoomItem;