'use client'
import { Button } from "../ui/button";
import { Blocks } from "lucide-react"
import { LayoutList } from "lucide-react"

import { useRouter } from 'next/navigation'

const HomeNavigation = ({ navStyles = '' }) => {
    const router = useRouter();

    return (
        <div className={`${navStyles}`}>
            <div className="flex flex-col  mb-auto ">
                <Button className=" bg-[#edf0ef] border border-[#4b665b] shadow-md text-[#111815] text-lg mb-2 mt-6 rounded-full px-6 py-7 w-[300px] hover:bg-[#4b665b] hover:text-white  hover:shadow-lg transition-all duration-400 ease-out   " onClick={() => router.push('/areas')} >
                    Rooms and Areas
                </Button>
                <Button className=" bg-[#edf0ef] shadow-md border border-[#4b665b] text-[#111815] text-lg mb-4 rounded-full px-6 py-7 w-[300px] hover:bg-[#fff]  hover:shadow-lg transition-all duration-400 ease-out  " onClick={() => router.push('/categories')} >
                    Categories
                </Button>
                <div className="flex">

                    <Button className=" bg-[#edf0ef] border w-1/2 mr-2 border-[#4b665b] text-[#111815] text-lg mb-6 rounded-full px-6 py-7  hover:bg-[#fff] hover:border-white hover:shadow-lg transition-all duration-400 ease-out  " onClick={() => router.push('/print')} >
                        Print
                    </Button>
                    <Button className=" bg-[#edf0ef] border w-1/2 border-[#4b665b] text-[#111815] text-lg mb-6 rounded-full px-6 py-7  hover:bg-[#fff] hover:border-white hover:shadow-lg transition-all duration-400 ease-out  " onClick={() => router.push('/floor-plans')} >
                        Floor Plans
                    </Button>
                </div>
            </div>
            <Button variant={'link'} className="text-lg underline" onClick={() => router.push('/admin')} >
                Admin
            </Button>

        </div>
    )
}

export default HomeNavigation;