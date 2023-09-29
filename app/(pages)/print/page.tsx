'use client'
import BottomNavigation from "@/components/layout/bottom-navigation";
import Layout from "@/components/layout/layout";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { LayoutList } from "lucide-react";
import { useRouter } from "next/navigation";
const Print = () => {
    const router = useRouter();
    return (
        <Layout>
                 <div className='sticky top-[79px] bg-[#f2f2f2/80] backdrop-blur-sm  border-b py-2 px-4 mb-4 w-full flex items-center justify-between'>
        <h1 className='font-bold sm:text-lg '>Select an option</h1>
     </div>
            <div className='grid grid-cols-1 lg:grid lg:grid-cols-3 place-items-center place-content-center gap-3 w-full  p-4 pt-0'>
                <Button className="  w-full  text-black flex justify-center border   items-center  py-8 px-2 bg-white text-center shadow-sm rounded-sm hover:bg-[#ebf1ef] hover:shadow-lg  transition-all duration-400 ease-out hover:border hover:border-[#c4d5ce]" onClick={() => router.push('/print/antiques')} >
                   Antiques
                </Button>
                <Button className="w-full  text-black flex justify-center border   items-center  py-8 px-2 bg-white text-center shadow-sm rounded-sm hover:bg-[#ebf1ef] hover:shadow-lg  transition-all duration-400 ease-out hover:border hover:border-[#c4d5ce]" onClick={() => router.push('/print/labels')} >
                   Labels
                </Button>
                <Button className=" w-full  text-black flex justify-center border   items-center  py-8 px-2 bg-white text-center shadow-sm rounded-sm hover:bg-[#ebf1ef] hover:shadow-lg  transition-all duration-400 ease-out hover:border hover:border-[#c4d5ce]" onClick={() => router.push('/print/rooms')} >
                   Rooms
                </Button>
            </div>
        </Layout>
    )
}
export default Print;
