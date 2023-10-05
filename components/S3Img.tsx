'use client'

import { useState, useEffect } from 'react';
import { Img, ImgProps } from 'react-image'
import { useInView } from 'react-intersection-observer'
import { cn } from "@/lib/utils"
import Image from 'next/image';
export interface S3ImgProps extends Omit<ImgProps, 'src'> {
  src: string
}

const S3Img = (props: S3ImgProps) => {
  const { src: injectedSrc } = props
  const [imgSrc, setImgSrc] = useState('');

  const { ref, inView } = useInView()

  useEffect(() => {
    const fetchImage = async () => {
      const injectedSrcWithoutLeadingSlash = injectedSrc.replace(/^\//, '');
      const res = await fetch(`/api/aws/s3/${encodeURIComponent(injectedSrcWithoutLeadingSlash)}`)
      const data = await res.json();
      if (data.url) setImgSrc(data.url);
    };
    if (inView && !imgSrc) fetchImage();
  }, [inView]);

  return (
    <div ref={ref}>
      <Img src={imgSrc} width={150} height={150} className={cn(props.className)} loader={<div className=' flex flex-col items-center justify-center h-[150px] w-[150px] mx-auto'>Loading...</div>} unloader={<div className=' flex flex-col items-center justify-center'><Image src={'/cdp-logo.png'} width={50} height={50} alt='No Image'/></div>} />
    </div>
  )
}

export default S3Img;
