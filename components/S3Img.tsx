'use client'

import { useState, useEffect } from 'react';
import { Img, ImgProps } from 'react-image'
import { useInView } from 'react-intersection-observer'

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
    if (inView) fetchImage();
  }, [inView]);

  return (
    <div ref={ref}>
      <Img src={imgSrc} loader={<div>Loading...</div>} unloader={<div>No image</div>} />
    </div>
  )
}

export default S3Img;
