import React, { useState } from 'react'
import convert from 'color-convert'
import tw, { css } from 'twin.macro'

export const textG3 = css`color: #303540`
export const textG6 = css`color: #607080`
export const fontEbGaramond = css`font-family: 'EB Garamond', serif`
export const fontNotoSerifJp = css`font-family: 'Noto Serif JP', serif`
export const fontPrompt = css`font-family: 'Prompt', sans-serif;`

// headings
export const hero = tw`font-[800] text-3xl md:text-4xl lg:text-[64px] lg:leading-[1.12]`

// buttons
export const cap = tw`text-[14px] tracking-[.2em]`
export const cap_thin = css`${cap}${tw`font-[400] text-gray-500`}`
export const cap_thick = css`${cap}${tw`font-[900] text-gray-800`}`
export const p_btn_1 = tw`text-sm md:text-base md:font-[600]`
export const p_btn_2 = tw`text-sm md:text-base md:font-[600]`

// paragraph
export const p_sm = tw`text-sm md:text-sm font-[500] lg:leading-[160%]`
export const p_xl = tw`text-base md:text-lg lg:text-xl lg:leading-[160%] font-[400] text-[#445577]`
export const p_tag = tw`text-base md:text-base lg:text-lg font-[600] text-blue-600 lg:leading-[160%]`

// margins
export const mb_2 = tw`mb-2 md:mb-4 lg:mb-6`
export const mb_3 = tw`mb-3 md:mb-6 lg:mb-8`

export const H1 = ({ hero: heroP, ...props }: any) => (
  <h1 {...props} css={[tw`text-4xl text-[var(--text-main)]`, heroP && hero]} />
)
export const H2 = ({ hero: heroP, ...props }: any) => (
  <h2 {...props} css={[tw`text-2xl text-[var(--text-main)] mb-5 md:(text-3xl)`, heroP && hero]} />
)
export const H3 = ({ hero: heroP, ...props }: any) => (
  <h2 {...props} css={[tw`text-xl text-[var(--text-main)] mb-5 md:(text-2xl)`, heroP && hero]} />
)
export const PRE = ({ ...props }: any) => (
  <pre {...props} css={tw`mx-auto my-20 border overflow-x-scroll p-5 md:pl-20 rounded-xl shadow-lg `} />
)

export const snapper = css`
width: 100%;

@media (min-width: 465px) {
  width: calc(465px - var(--scrollbar-width));
}

@media (min-width: 640px) {
  width: calc(640px - var(--scrollbar-width));
}

@media (min-width: 768px) {
  width: calc(768px - var(--scrollbar-width));
}

@media (min-width: 1024px) {
  width: calc(1024px - var(--scrollbar-width));
}

@media (min-width: 1280px) {
  width: calc(1280px - var(--scrollbar-width));
}

@media (min-width: 1536px) {
  width: calc(1536px - var(--scrollbar-width));
}`

export const HoverBoard = ({ children, bg, initW, initH, range }: any) => {
  const [hovered, setHovered] = useState(false)
  const [hue, setHue] = useState(0)

  const handleMouse = {
    onMouseEnter: () => {
      setHovered(true)
      // Generate a random change in hue between -100 and 100
      const hueChange = Math.floor(Math.random() * range) - (range / 2)
      setHue((hueChange + 360) % 360)  // Ensures hue is in the range 0-359
    },
    onMouseLeave: () => {
      setHovered(false)
    },
  }

  // Assuming `bg` is in hex format
  const hsl = convert.hex.hsl(bg)

  // Change the hue value (1st value of the HSL)
  hsl[0] = (hsl[0] + hue) % 360 // Use modulo 360 to ensure hue stays within valid range

  // Convert HSL array back to a string
  const hslString = `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`

  return (
    <span {...handleMouse} css={tw`relative box-content`}>
      <span
        css={tw`w-full h-full absolute bottom-0 transition-all duration-300 -z-10`}
        style={{
          maxHeight: hovered ? '100%' : `${initH}%`,
          maxWidth: hovered ? '100%' : `${initW}%`,
          background: `linear-gradient(78deg, ${bg}, ${hslString})`,
        }}
      />
      {children}
    </span>
  )
}

export const fadeStyles = {
  fadein: css`
    @keyframes fadeInFromRight {
      0% {
        opacity: 0;
        transform: translateX(15px);
      }
      100% {
        opacity: 1;
        transform: translateX(0);
      }
    }
    animation: fadeInFromRight 1s ease-in-out forwards;`,
  fadeout: css`
    @keyframes fadeOutToLeft {
      0% {
        opacity: 1;
        transform: translateX(0);
      }
      100% {
        opacity: 0;
        transform: translateX(-15px);
      }
    }
    animation: fadeOutToLeft 1s ease-in-out forwards;`,
}