'use client'
import { Angry, CaseUpper, Castle, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
export const AreaItem = ({ title, slug, count }: { title: string, slug: string, count: string }) => {
    const router = useRouter();
    function handleAreaItemClick() {
        router.push(`/areas/${slug}`)
    }
    return (
        <Button className="group w-full py-4 sm:py-4 flex justify-between  items-center rounded-full  h-auto bg-white/40" onClick={handleAreaItemClick}>
            <div className="h-12 w-12 sm:w-12 sm:h-12 flex items-center justify-center rounded-full mr-4 bg-white group-hover:bg-[#a8c2b8]">
                <Castle className="h-4 w-4 sm:h-auto sm:w-auto" />
            </div>
            <div className="flex flex-col items-start justify-center mr-auto">
                <span className=" sm:text-lg font-bold">
                    {title.toUpperCase()}
                </span>
                <span>
                    {count}
                </span>
            </div>
            <div className="h-12 w-12 sm:w-12 sm:h-12 flex items-center justify-center rounded-full  bg-[#111815] text-white ml-auto group-hover:text-[#a8c2b8]">
                <ChevronRight />
            </div>
        </Button>
    )
}
export default AreaItem;