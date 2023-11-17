import {useEffect, useState} from "react";
import {useInView} from "react-intersection-observer";

export interface UseS3Img {
  src: string
  disableLazy?: boolean
}

const useS3Img = (props: UseS3Img) => {
  const { src: injectedSrc, disableLazy } = props

  const [imgSrc, setImgSrc] = useState('');
  const { ref, inView } = useInView()

  useEffect(() => {
    const fetchImage = async () => {
      const injectedSrcWithoutLeadingSlash = injectedSrc.replace(/^\//, '');
      const res = await fetch(`/api/aws/s3/${encodeURIComponent(injectedSrcWithoutLeadingSlash)}`)
      const data = await res.json();
      if (data.url) setImgSrc(data.url);
    }

    if ((disableLazy ? true : inView) && !imgSrc) fetchImage();
  }, [disableLazy ? injectedSrc : inView]);

  return { imgSrc, ref }
}

export default useS3Img
