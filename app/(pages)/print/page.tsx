'use client'
import BottomNavigation from "@/components/layout/bottom-navigation";
import Layout from "@/components/layout/layout";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Home, LayoutList } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
const Print = () => {
    const router = useRouter();
    return (
        <Layout>
            <div className='sticky top-[79px] bg-[#fff] min-h-[46px]  border-b py-2 px-4 mb-4 flex items-center justify-between shadow-sm w-full  mx-auto '>
                <div className='text-xs w-full max-w-5xl mx-auto flex items-center'>
                    <Link href='/' className='hover:underline'>
                        <Home className='inline-block w-4' />
                    </Link>
                    <ChevronRight className='inline-block w-4' />
                    <Link href='/floor-plans' className=' pointer-events-none' >Print</Link>
                </div>
            </div>
            <div className='grid grid-cols-1 lg:grid lg:grid-cols-3 place-items-center place-content-center gap-3 w-full px-4 sm:px-0   pt-0'>
                <Button className="  w-full  text-black flex justify-center border   items-center  py-8 px-2 bg-white text-center shadow-sm rounded-sm hover:bg-[#ebf1ef] hover:shadow-lg  transition-all duration-400 ease-out hover:border hover:border-[#c4d5ce]" onClick={() => router.push('/print/antiques')} >
                    Items
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
