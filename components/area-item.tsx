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
        <Button className="group w-full py-4 flex justify-between  items-center rounded-full [&:not(:last-child)]:mb-4 h-auto bg-white/40 " onClick={handleAreaItemClick}>
            <div className="w-12 h-12 flex items-center justify-center rounded-full mr-4 bg-white group-hover:bg-lime-500">
                <Castle />
            </div>
            <div className="flex flex-col items-start justify-center mr-auto">
                <span className=" text-lg font-bold">
                {title.toUpperCase()}
                </span>
                <span>

                {count}
                </span>

            </div>
            <div className="w-12 h-12 flex items-center justify-center rounded-full  bg-black text-yellow-50 ml-auto group-hover:text-lime-500">
                <ChevronRight />
            </div>
        </Button>
    )

}

export default AreaItem;