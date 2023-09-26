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
        <Button className="group w-full  text-black flex justify-between border   items-center  py-8 px-2 bg-white shadow-sm rounded-full hover:bg-[#ebf1ef] hover:shadow-lg  transition-all duration-400 ease-out hover:border hover:border-[#c4d5ce] " onClick={handleAreaItemClick}>
            <div className="mr-2 p-2  rounded-full w-9 h-9 flex items-center justify-center bg-[#dadada] text-black mx-2 text-xs group-hover:text-white group-hover:bg-black transition-all duration-400 ease-out "><span className="text-xs" >{count}</span></div>
            <div className="flex flex-col">
                <p className="text-md">{title}</p>

            </div>
            <div className="flex items-center justify-center justify-self-end  rounded-full   ml-auto mr-2 text-[#aaaaaa]  ">
                <ChevronRight className="w-8 h-8" />
            </div>
        </Button>
    )
}
export default AreaItem;