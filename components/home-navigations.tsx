'use client'
import { Button } from "./ui/button";
import { Blocks } from "lucide-react"
import { LayoutList } from "lucide-react"

import { useRouter } from 'next/navigation'

const HomeNavigation =  () => {
    const router = useRouter();
    
    return(
        <div className="bottom-navigation flex flex-col items-center justify-between">
            <Button className=" bg-emerald-300 text-md mb-6 rounded-3xl p-6 w-64" onClick={() => router.push('/areas')} >
                <Blocks className="mr-2 h-4 w-4" /> Browse Areas
            </Button>
            <Button className=" bg-emerald-300 text-md mb-6 rounded-3xl p-6 w-64" onClick={() => router.push('/categories')} >
                <LayoutList className="mr-2 h-4 w-4" /> Browse Categories
            </Button>
            <Button className=" bg-emerald-300 text-md  rounded-3xl p-6 w-64" onClick={() => router.push('/admin')} >
                <LayoutList className="mr-2 h-4 w-4" /> Admin
            </Button>
     
        </div>
    )
}

export default HomeNavigation;