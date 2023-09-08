'use client'
import { Img } from 'react-image'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from './ui/button'
import Link from 'next/link'
const AntiqueItem = ({ image, qr, itemNo, description, width, height, depth, area, room }: { image: string[], qr: string, itemNo: string, description: string, width: string, height: string, depth: string, area: string, room: string }) => {
    return (
        <Sheet>
            <SheetTrigger asChild >
                <button className='relative overflow-hidden h-[100%] w-[100%] m-auto' >
                    <Img
                        src={image}
                        alt={itemNo}
                        className='m-auto'
                    />
                    <span className='text-white text-xs bg-gray-500 absolute left-0 bottom-0 w-5/12 py-2 rounded-tr-md'>{itemNo}</span>
                </button>
            </SheetTrigger>

            <SheetContent side={"bottom"} className="h-[80vh] ">
                <div className='mt-4'>
                    <Img
                        src={image}
                        alt={itemNo}
                        width={'300'}
                        height={'300'}
                        className='relative m-auto'
                    />
                </div>
                <SheetHeader>
                    Jamshid and Dan
                    <SheetTitle className=' text-white p-2 bg-gray-800 w-2/5 m-auto mt-4 rounded-full'> {itemNo} </SheetTitle>
                    <SheetDescription>
                        <div className='mb-4'>
                        {description}
                        </div>
                        <br />
                        width: { width} | 
                        height: { height} | 
                        depth:{ depth}
                        <br />
                        Area: { area}
                        <br />
                        Room : { room}
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}
export default AntiqueItem