'use client'

import React from 'react'
import useS3Img from "@/utils/useS3Img";
import {Room} from "@prisma/client";

export interface RoomSchemeItemProps {
  room?: Room | null
}

const RoomSchemeItem: React.FC<RoomSchemeItemProps> = (props) => {
  const { room } = props

  const { imgSrc, ref } = useS3Img({ src: `/schemas/${room?.slug}.jpeg`, disableLazy: true })

  if (!imgSrc) return null

  return (
    <div className="group relative h-[150px] p-4 bg-white rounded-lg overflow-hidden shadow-md hover:border-[#c4d5ce] hover:shadow-lg transition-all duration-300 ease-out">
      <img ref={ref} src={imgSrc} alt={`${room?.slug}-scheme`} />
      <span className=' text-sm bg-[#4b665b] text-white group-hover:bg-[#c4d5ce]  absolute left-0 text-center bottom-0 w-4/12 py-1 rounded-tr-lg z-10'>SCHEME</span>
    </div>
  )
}

export default RoomSchemeItem
