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
import { Antique } from "@prisma/client"
import { cva, type VariantProps } from "class-variance-authority"
export interface AntiqueItemProps extends Partial<Antique> {
  image: string[]
  itemNo: string
  area?: string | null
  room?: string | null
}

const AntiqueItem = ({
  image,
  itemNo,
  description,
  width,
  height,
  depth,
  area,
  room,
}: AntiqueItemProps) => {
   
    
    return (
        <Sheet>
            <SheetTrigger asChild >
                <button className='relative border  h-[150px] bg-white rounded-sm overflow-hidden' >
                    <Img
                        src={image}
                        alt={itemNo}
                        className='m-auto w-auto h-full'
                    />
                    <span className='text-white text-md bg-gray-600 absolute left-0 bottom-0 w-5/12 py-2 rounded-tr-lg'>{itemNo}</span>
                </button>
            </SheetTrigger>

            <SheetContent  side={"bottom"} className="h-[80vh]">
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
