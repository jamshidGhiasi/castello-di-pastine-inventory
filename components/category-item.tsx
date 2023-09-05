'use client'

import { Angry, CaseUpper, Castle, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
export const CategoryItem = ({ title, slug, count }: { title: string, slug: string, count: string }) => {
    const router = useRouter();
    function handleAreaItemClick() {
        router.push(`/categories/${slug}`)

    }
    return (
        <Button className="group w-full sm:w-96 py-2 sm:py-4 flex justify-between  items-center rounded-full [&:not(:last-child)]:mb-4 h-auto bg-white/40 " onClick={handleAreaItemClick}>
            <div className="h-8 w-8 sm:w-12 sm:h-12 flex items-center justify-center rounded-full mr-4 bg-white group-hover:bg-lime-500">
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
            <div className="h-8 w-8 sm:w-12 sm:h-12 flex items-center justify-center rounded-full  bg-black text-yellow-50 ml-auto group-hover:text-lime-500">
                <ChevronRight />
            </div>
        </Button>
    )

}

export default CategoryItem;