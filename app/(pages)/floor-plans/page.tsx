'use client'

import Layout from "@/components/layout/layout";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import 'lightbox.js-react/dist/index.css'
import { SlideshowLightbox, initLightboxJS } from 'lightbox.js-react'
import { useEffect } from "react";
import Image from "next/image";


const images = [
    {
        src: '/Villa-Ground-Floor.jpg',
        alt: 'Mechanical keyboard with white keycaps.',
    },
    {
        src: '/Villa-Second-Floor.jpg',
        alt: 'Mechanical keyboard with white, pastel green and red keycaps.',
    },
    {
        src: '/VILLA-GF-Furniture-Layout.jpg',
        alt: 'Mechanical keyboard with white, pastel pink, yellow and red keycaps.',
    },
    {
        src: '/Villa-First-Floor.jpg',
        alt: 'Mechanical keyboard with white, pastel pink, yellow and red keycaps.',
    },
    {
        src: '/VILLA-1F-Furniture-Layout.jpg',
        alt: 'Mechanical keyboard with white, pastel pink, yellow and red keycaps.',
    },
    {
        src: '/VILLA-2F-Furniture-Layout.jpg',
        alt: 'Mechanical keyboard with white, pastel pink, yellow and red keycaps.',
    },
]

const FloorPlans = () => {
    useEffect(() => {
        initLightboxJS("A475-FD95-8CD8-09B4", "Individual");
    });
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
                <SlideshowLightbox theme="night" lightboxIdentifier="lightbox1" framework="next" images={images} showThumbnails={true}  captionStyle={{color: "silver"}}>
                    <div className="grid grid-cols-1 lg:grid lg:grid-cols-3 place-items-center place-content-center gap-3  w-full max-w-5xl mx-auto px-4 sm:px-0 pt-0 pb-4 sm:pb-0">

                    {images.map((image) => (
                        <Image
                            key={image.src}
                            src={image.src}
                            
                            alt={image.alt}
                            height={500}
                            width={500}
                            data-lightboxjs="lightbox1"
                            quality={80}
                            className="w-full rounded shadow-lg"
                        />
                      
                    ))}
                    </div>
                </SlideshowLightbox>
            </div>
        </Layout>
    )
}

export default FloorPlans;
