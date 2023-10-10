'use client'

import React from "react"
import {
  useKeenSlider,
  KeenSliderPlugin,
  KeenSliderInstance,
} from "keen-slider/react"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog"

import "keen-slider/keen-slider.min.css"
import Zoom from 'react-medium-image-zoom'
import "react-medium-image-zoom/dist/styles.css";

function ThumbnailPlugin(
  mainRef: React.MutableRefObject<KeenSliderInstance | null>
): KeenSliderPlugin {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove("active")
      })
    }
    function addActive(idx: number) {
      slider.slides[idx].classList.add("active")
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx)
        })
      })
    }

    slider.on("created", () => {
      if (!mainRef.current) return
      addActive(slider.track.details.rel)
      addClickEvents()
      mainRef.current.on("animationStarted", (main) => {
        removeActive()
        const next = main.animator.targetIdx || 0
        addActive(main.track.absToRel(next))
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next))
      })
    })
  }
}

export interface SliderWithThumbnailsProps {
  items: React.ReactNode[]
}

export default function SliderWithThumbnails(props: SliderWithThumbnailsProps) {
  const { items } = props

  const [open, setOpen] = React.useState(false);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
  })
  const thumbnailProps = {
    initial: 0,
    slides: {
      perView: 5,
      spacing: 5,
    },
  }
  const [verticalThumbnailRef] = useKeenSlider<HTMLDivElement>(
    { ...thumbnailProps, vertical: true },
    [ThumbnailPlugin(instanceRef)]
  )
  const [horizontalThumbnailRef] = useKeenSlider<HTMLDivElement>(
    { ...thumbnailProps },
    [ThumbnailPlugin(instanceRef)]
  )

  const handleThumbnailClick = () => {
    setOpen(true)
  }

  if (!items?.length) return null

  const sliderJsx = (
    <div ref={sliderRef} className="keen-slider">
      {items.map((item: React.ReactNode, i: number) => {
        return (
          <div key={`number-slide${i}`} className={`keen-slider__slide number-slide${i}`}>
            <div className="min-w-[50vw] max-md:w-[100vw]">
             <Zoom>{item}</Zoom>
            </div>
          </div>
        )
      })}
    </div>
  )
  const verticalThumbnailsJsx = (
    <div ref={verticalThumbnailRef} className="keen-slider thumbnail">
      {items.map((item: React.ReactNode, i: number) => {
        return (
          <div key={`thumbnail-slide${i}`} className={`keen-slider__slide number-slide${i}`}>
            <div className="md:w-[120px] md:h-[86px]">
            {item}
            </div>
          </div>
        )
      })}
    </div>
  )
  const verticalThumbnailsJsxWithDialog = (
    <div ref={verticalThumbnailRef} className="keen-slider thumbnail">
      {items.map((item: React.ReactNode, i: number) => {
        return (
          <div key={`thumbnail-slide${i}`} className={`keen-slider__slide number-slide${i}`} onClick={handleThumbnailClick}>
            <div className="md:w-[120px] md:h-[86px]">
              
              {item}
              
            </div>
          </div>
        )
      })}
    </div>
  )
  const horizontalThumbnailsJsx = (
    <div ref={horizontalThumbnailRef} className="keen-slider thumbnail">
      {items.map((item: React.ReactNode, i: number) => {
        return (
          <div key={`thumbnail-slide${i}`} className={`keen-slider__slide number-slide${i} !min-w-[120px] !w-[120px] h-[86px]`}>
            <div className="w-[120px] h-[86px]">
              {item}
            </div>
          </div>
        )
      })}
    </div>
  )

  return (
    <div>
      {/* Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[100vw] max-h-[100vh] max-md:h-full px-0 overflow-hidden ">
          <DialogHeader />
          {sliderJsx}
          <DialogFooter>
            {horizontalThumbnailsJsx}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-12 gap-4 h-[100%]">
        {/* Slider */}
        <div className="col-span-10 order-2 max-md:hidden">
          {sliderJsx}
        </div>

        {/* Thumbnails */}
        <div className="max-md:col-span-12 md:max-h-[640px] max-md:hidden">
          {verticalThumbnailsJsx}
        </div>
        <div className="max-md:col-span-12 md:max-h-[640px] md:hidden">
          {verticalThumbnailsJsxWithDialog}
        </div>
      </div>
    </div>
  )
}
