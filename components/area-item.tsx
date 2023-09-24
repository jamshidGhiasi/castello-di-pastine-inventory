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
        <Button className="group w-full bg-transparent text-black flex justify-between   items-center  py-6 px-2 bg-white shadow-sm rounded-full hover:bg-[#4f6d61]   " onClick={handleAreaItemClick}>
            <div className="mr-2 p-2  rounded-full w-9 h-9 flex items-center justify-center"><span className=" text-neutral-400">{count}</span></div>
            <div className="flex flex-col">
                   <p className="text-md group-hover:text-white">{title}</p>
                   
                </div>
            <div className="flex items-center justify-center justify-self-end   ml-auto  text-black group-hover:text-white">
                <ChevronRight />
            </div>
        </Button>
    )
}
export default AreaItem;