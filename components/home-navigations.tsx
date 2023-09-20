'use client'
import { Button } from "./ui/button";
import { Blocks } from "lucide-react"
import { LayoutList } from "lucide-react"

import { useRouter } from 'next/navigation'

const HomeNavigation = ({ navStyles = ''}) => {
    const router = useRouter();

    return (
        <div className={`${navStyles}`}>
            <div className="flex flex-col  mb-auto ">
                <Button className=" bg-[#a8c2b8]  text-[#111815] text-lg mb-6 rounded-full px-6 py-7 w-64" onClick={() => router.push('/areas')} >
                    Rooms and Areas
                </Button>
                <Button className=" bg-[#a8c2b8] text-[#111815] text-lg rounded-full px-6 py-7 w-64" onClick={() => router.push('/categories')} >
                    Categories
                </Button>
            </div>
            <Button variant={'link'} className="text-lg underline" onClick={() => router.push('/admin')} >
                Admin
            </Button>

        </div>
    )
}

export default HomeNavigation;