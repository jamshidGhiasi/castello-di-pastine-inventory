'use client'
import { Button } from "./ui/button";
import { Blocks, Map, Printer } from "lucide-react"
import { LayoutList } from "lucide-react"
import {  usePathname, useRouter } from 'next/navigation'
const BottomNavigation = () => {
    const router = useRouter();
    const pathname = usePathname()

    return (
        <div className="fixed bottom-0 sm:bottom-10 flex items-center justify-between w-full  left-1/2 -translate-x-1/2  sm:w-auto  backdrop-blur-2xl dark:border-neutral-800 dark:bg-neutral-900/30  border border-gray-50 p-0 sm:p-4 sm:rounded-lg z-10">
            <Button variant="outline" className={`border-none sm:text-sm text rounded-none sm:rounded-md sm:p-2 flex flex-col items-center justify-center h-24 w-1/4  sm:h-24 sm:w-24 mx-1 ml-0    hover:bg-gray-500/50   bg-transparent  ${pathname.indexOf("/areas") != -1 ? "bg-white/20" : ""}`} onClick={() => router.push('/areas')} >
                <Blocks className=" w-6 h-9 mb-1" />
                <span>Areas</span>
            </Button>
            <Button variant="outline" className={`border-none sm:text-sm text rounded-none sm:rounded-md sm:p-2 flex flex-col items-center justify-center h-24 w-1/4  sm:h-24 sm:w-24  mx-1  hover:bg-gray-500/50   bg-transparent  ${pathname.indexOf("/categories") != -1 ? "bg-white/20" : ""}`} onClick={() => router.push('/categories')} >
                <LayoutList className="w-6 h-9 mb-1" />
                <span>Categories</span>
            </Button>
            <Button variant="outline" className={`border-none sm:text-sm text rounded-none sm:rounded-md sm:p-2 flex flex-col items-center justify-center h-24 w-1/4  sm:h-24 sm:w-24  mx-1  hover:bg-gray-500/50   bg-transparent  ${pathname == "/floor-plans" ? "bg-white/20" : ""}`} onClick={() => router.push('/floor-plans')} >
                <Map className="w-6 h-9 mb-1" />
                <span>Floor Plans</span>
            </Button>
            <Button variant="outline" className={`border-none sm:text-sm text rounded-none sm:rounded-md sm:p-2 flex flex-col items-center justify-center h-24 w-1/4  sm:h-24 sm:w-24  mx-1 mr-0  hover:bg-gray-500/50   bg-transparent  ${pathname == "/print" ? "bg-white/20" : ""}`} onClick={() => router.push('/print')} >
                <Printer className="w-6 h-9 mb-1" />
                <span>Print</span>
            </Button>
        </div>
    )
}
export default BottomNavigation;