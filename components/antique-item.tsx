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
import S3Img from '@/components/S3Img'

export interface AntiqueItemProps extends Partial<Antique> {
  image: string[]
  itemNo: string
  area?: string | null
  room?: string | null
  category?: string | null
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
  category
}: AntiqueItemProps) => {
    return (
        <Sheet>
            <SheetTrigger asChild >

                <button className='group relative h-[150px] p-4 bg-white rounded-lg overflow-hidden shadow-md  hover:border-[#c4d5ce] hover:shadow-lg transition-all duration-300 ease-out' >
                    <S3Img
                      src={image[0]}
                      alt={itemNo}
                      className='m-auto w-auto h-full'
                    />
                    <span className=' text-sm bg-[#ececec] group-hover:bg-[#c4d5ce]  absolute left-0 bottom-0 w-4/12 py-1 rounded-tr-lg z-10'>{itemNo}</span>
                    <div className='absolute top-0 left-0 bottom-0 right-0 border-[4px] border-[#ececec] rounded-lg group-hover:border-[#c4d5ce]'></div>
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
