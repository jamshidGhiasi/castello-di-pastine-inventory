'use client'

import { Img, ImgProps } from 'react-image'
import { cn } from "@/lib/utils"
import Image from 'next/image';
import useS3Img from "@/utils/useS3Img";

export interface S3ImgProps extends Omit<ImgProps, 'src'> {
  src: string
}

const S3Img = (props: S3ImgProps) => {
  const { imgSrc, ref } = useS3Img(props)

  return (
    <div ref={ref}>
      <Img src={imgSrc} width={150} height={150} className={cn(props.className)} loader={<div className=' flex flex-col items-center justify-center h-[150px] w-[150px] mx-auto'>Loading...</div>} unloader={<div className=' flex flex-col items-center justify-center'><Image src={'/cdp-logo.png'} width={50} height={50} alt='No Image'/></div>} />
    </div>
  )
}

export default S3Img;
