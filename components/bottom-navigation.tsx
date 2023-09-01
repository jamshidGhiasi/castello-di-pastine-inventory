'use client'
import { Button } from "./ui/button";
import { Blocks, Map, Printer } from "lucide-react"
import { LayoutList } from "lucide-react"
import { useRouter } from 'next/navigation'
const BottomNavigation = () => {
    const router = useRouter();
    return (
        <div className="fixed bottom-4 sm:bottom-10  left-1/2 -translate-x-1/2 flex items-center justify-between w-11/12 sm:w-auto  backdrop-blur-2xl dark:border-neutral-800 dark:bg-neutral-900/30  border border-gray-50 p-1 sm:p-4 rounded-lg z-10">
            <Button variant="outline" className="sm:text-sm text rounded-md sm:p-2 flex flex-col items-center justify-center h-24 w-1/4  sm:h-24 sm:w-24 mr-1 sm:mr-4 border-none hover:bg-gray-500/50   bg-transparent" onClick={() => router.push('/areas')} >
                <Blocks className=" w-6 h-9 mb-1" />
                <span>Areas</span>
            </Button>
            <Button variant="outline" className="sm:text-sm rounded-md sm:p-2  flex flex-col items-center justify-center h-24 w-1/4  sm:h-24 sm:w-24  mr-1 sm:mr-4 border-none hover:bg-gray-500/50 bg-transparent" onClick={() => router.push('/categories')} >
                <LayoutList className="w-6 h-9 mb-1" />
                <span>Categories</span>
            </Button>
            <Button variant="outline" className="sm:text-sm rounded-md sm:p-2 flex flex-col items-center justify-center h-24 w-1/4  sm:h-24 sm:w-28  mr-1 sm:mr-4 border-none hover:bg-gray-500/50 bg-transparent" onClick={() => router.push('/floor-plans')} >
                <Map className="w-6 h-9 mb-1" />
                <span>Floor Plans</span>
            </Button>
            <Button variant="outline" className="sm:text-sm rounded-md sm:p-2 flex flex-col items-center justify-center h-24 w-1/4  sm:h-24 sm:w-24  border-none hover:bg-gray-500/50 bg-transparent" onClick={() => router.push('/print')} >
                <Printer className="w-6 h-9 mb-1" />
                <span>Print</span>
            </Button>
        </div>
    )
}
export default BottomNavigation;