'use client'

import React from "react"
import {
  useKeenSlider,
  KeenSliderPlugin,
  KeenSliderInstance,
} from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

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

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
  })
  const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      slides: {
        perView: 5,
        spacing: 5,
      },
      vertical: true,
    },
    [ThumbnailPlugin(instanceRef)]
  )

  if (!items?.length) return null

  return (
    <div className="flex gap-4 flex-row-reverse h-[100%]">
      {/* Slider */}
      <div className="grid grid-col-10">
        <div ref={sliderRef} className="keen-slider">
          {items.map((item: React.ReactNode, i: number) => {
            return (
              <div key={`number-slide${i}`} className={`keen-slider__slide number-slide${i}`}>
                <div className="min-w-[50vw] w-full h-full">
                  {item}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-col-2 max-h-[640px]">
        <div ref={thumbnailRef} className="keen-slider thumbnail">
        {items.map((item: React.ReactNode, i: number) => {
            return (
              <div key={`thumbnail-slide${i}`} className={`keen-slider__slide number-slide${i}`}>
                <div className="w-[120px] h-[86px]">
                  {item}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
