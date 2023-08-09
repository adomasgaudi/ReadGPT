'use client'

import tw from 'twin.macro'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const useMouse = () => {
  const [mouseY, setMouseY] = useState(0)
  useEffect(() => {
    const updateMousePosition = (ev) => {
      setMouseY(ev.clientY)
    }

    window.addEventListener('mousemove', updateMousePosition)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
    }
  }, [])
  return mouseY
}

// background-image: linear-gradient(rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) ${(mouseY / bodyHeight) * 100 - 20}%, rgba(255, 255, 255, 0) ${(mouseY / bodyHeight) * 100}%);

export default function ImageSlider({ children, child, images, slideIndex }: any) {
  const mouseY = useMouse()
  const [bodyHeight, setBodyHeight] = useState(0)

  useEffect(() => {
    if (typeof document !== 'undefined') { // Checking if document object exists
      setBodyHeight(document.body.scrollHeight)
    }
  }, [])
  return (
    <>
      <div className="scroll" css={tw`relative w-screen max-h-screen mx-auto overflow-hidden`}>
        <div
          css={[' scrollbar-width: 0; -ms-overflow-style: none;', tw`flex transition duration-[3s]`]}
          style={{ transform: `translateX(-${slideIndex * 100}%)` }}
        >
          {images.map((image: any, index: any) =>
            <Image
              key={index}
              src={image}
              css={['flex: 1 0 100%; transform: rotate(0deg);', tw`object-cover`]}
              alt=""
            />,
          )}
        </div>
        <div css={[tw`flex absolute bottom-[1.25rem] left-[50%] z-10`, 'column-gap: 1rem; transform: translateX(-50%) ']}>
        </div>
        <div css={tw`absolute z-20 top-0 left-0 w-full h-full `}>
          {/* <div css={[
            'background-image: linear-gradient(rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 20%, rgba(255, 255, 255, 0) 100%);',
            tw`absolute z-30 top-0 left-0 w-full h-full pointer-events-none`,
          ]}
          /> */}
          <div css={[
            `background-image: linear-gradient(
              to right bottom, 
              rgba(255, 255, 255, 1) 0%, 
              rgba(255, 255, 255, 1) 5%,
              rgba(255, 255, 255, 1) 15%, 
              rgba(255, 255, 255, 0.95) 75%,
              rgba(255, 255, 255, 0.6) 85%,
              rgba(255, 255, 255, 0) 100%
            );`,
            tw`absolute z-30 top-0 left-0 w-full h-full pointer-events-none`,
          ]}
          />
          {children}
          <div css={tw`absolute z-30 w-full h-full`}>{child.over}</div>
        </div>
      </div>
    </>
  )
}
