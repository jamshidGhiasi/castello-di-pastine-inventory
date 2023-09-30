'use client'

import Layout from "@/components/layout/layout";
import 'keen-slider/keen-slider.min.css'
import KeenSlider from 'keen-slider'
import { useKeenSlider } from 'keen-slider/react' // import from 'keen-slider/react.es' for to get an ES module
import { Img } from "react-image";
import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

const images = [
  "https://res.cloudinary.com/ifeomaimoh/image/upload/v1652345767/demo_image2.jpg",
  "https://res.cloudinary.com/ifeomaimoh/image/upload/v1652366604/demo_image5.jpg",
  "https://res.cloudinary.com/ifeomaimoh/image/upload/v1652345874/demo_image1.jpg",
];

const FloorPlans = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })

  function Arrow(props: {
    disabled: boolean
    left?: boolean
    onClick: (e: any) => void
  }) {
    const disabeld = props.disabled ? " arrow--disabled" : ""
    return (
      <svg
        onClick={props.onClick}
        className={`arrow ${props.left ? "arrow--left" : "arrow--right"
          } ${disabeld}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        {props.left && (
          <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
        )}
        {!props.left && (
          <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
        )}
      </svg>
    )
  }


  return (
    <Layout>
      <div className='sticky top-[79px] bg-[#fff] min-h-[46px]  border-b py-2 px-4 mb-4 flex items-center justify-between shadow-sm w-full  mx-auto '>
        <div className='text-xs w-full max-w-5xl mx-auto flex items-center'>
          <Link href='/' className='hover:underline'>
            <Home className='inline-block w-4' />
          </Link>
          <ChevronRight className='inline-block w-4' />
          <Link href='/floor-plans' className=' pointer-events-none' >Floor Plans</Link>
        </div>
      </div>
      <div className="px-4">

      <div ref={sliderRef} className="keen-slider">
        <div className="keen-slider__slide">
          <Img src={'/Villa-Ground-Floor.jpg'} />
        </div>
        <div className="keen-slider__slide">
          <Img src={'/Villa-Second-Floor.jpg'} />
        </div>
        <div className="keen-slider__slide">
          <Img src={'/VILLA-GF-Furniture-Layout.jpg'} />
        </div>
        <div className="keen-slider__slide">
          <Img src={'/Villa-First-Floor.jpg'} />
        </div>
        <div className="keen-slider__slide">
          <Img src={'/VILLA-1F-Furniture-Layout.jpg'} />
        </div>
        <div className="keen-slider__slide">
          <Img src={'/VILLA-2F-Furniture-Layout.jpg'} />
        </div>

      </div>
      </div>






    </Layout >


  )
}

export default FloorPlans;
