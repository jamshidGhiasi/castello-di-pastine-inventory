'use client'
import { Button } from "./ui/button";
import { Blocks } from "lucide-react"
import { LayoutList } from "lucide-react"

import { useRouter } from 'next/navigation'

const HomeNavigation =  () => {
    const router = useRouter();
    
    return(
        <div className="bottom-navigation flex flex-col">
            <Button className=" bg-emerald-300 text-lg mb-6 rounded-3xl p-6 w-64" onClick={() => router.push('/areas')} >
                Rooms and Areas
            </Button>
            <Button className=" bg-emerald-300 text-lg mb-6 rounded-3xl p-6 w-64" onClick={() => router.push('/categories')} >
                Categories
            </Button>
            <Button variant={'link'} className="text-lg underline"  onClick={() => router.push('/admin')} >
                 Admin
            </Button>
     
        </div>
    )
}

export default HomeNavigation;