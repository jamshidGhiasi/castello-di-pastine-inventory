'use client'

import React from 'react'
import {Img} from "react-image";
import SliderWithThumbnails from "@/components/ui/slider-with-thumbnails";

export interface FloorPlansSliderProps {}

const FloorPlansSlider: React.FC<FloorPlansSliderProps> = (props) => {
  return (
    <SliderWithThumbnails items={[
      <Img key={'/Villa-Ground-Floor.jpg'} src={'/Villa-Ground-Floor.jpg'} />,
      <Img key={'/Villa-Second-Floor.jpg'} src={'/Villa-Second-Floor.jpg'} />,
      <Img key={'/VILLA-GF-Furniture-Layout.jpg'} src={'/VILLA-GF-Furniture-Layout.jpg'} />,
      <Img key={'/Villa-First-Floor.jpg'} src={'/Villa-First-Floor.jpg'} />,
      <Img key={'/VILLA-1F-Furniture-Layout.jpg'} src={'/VILLA-1F-Furniture-Layout.jpg'} />,
      <Img key={'/VILLA-2F-Furniture-Layout.jpg'} src={'/VILLA-2F-Furniture-Layout.jpg'} />,
    ]} />
  )
}

export default FloorPlansSlider
