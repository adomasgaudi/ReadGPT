// @ts-ignore
import tw, { css, styled } from 'twin.macro'
import { useContext, useEffect, useState } from 'react'
import { LevelContext } from '@/context/levelContext'

const useMouse = () => {
  const [mouseX, setMouseX] = useState(0)
  useEffect(() => {
    const updateMousePosition = (ev) => {
      setMouseX(ev.clientX)
    }

    window.addEventListener('mousemove', updateMousePosition)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
    }
  }, [])
  return mouseX
}

const ins = {
  center: tw`flex justify-center items-center`,
}

const gradientStyles = (deg: any) => css`
background: linear-gradient(${deg}deg, rgba(205,49,49,1) 18%, rgba(217,101,53,0.891281512605042) 54%, rgba(215,169,51,0) 100%);
`

const textMain = tw`text-[var(--text-main)]`

const ss = {
  e1: tw`rounded-xl shadow-sm border border-[var(--accent)] bg-[var(--bg-main)]`,
  e2: tw`border-2 border-red-500 shadow-lg`,
  e3: tw`text-sm text-gray-500`,
}

const H1 = styled.h1`
  ${tw`text-4xl`}
  ${textMain}
  ${({ hasBorder }: any) => hasBorder && tw`border border-purple-500`}
`
const FlyingButton = () => {
  const mouseX = useMouse()
  return (
    <button style={{ transform: `translateX(${mouseX / 100}px)` }} css={[gradientStyles(mouseX / 10)]}>hello</button>
  )
}

//

//

//

//

//

export default function Inner() {
  const [theme, setTheme] = useContext<any>(LevelContext)

  const btnP = {
    onClick: () => setTheme((prev: any) => prev === 'light' ? 'dark' : 'light'),
  }
  return (

    <div css={[tw` max-w-[800px] mx-auto p-6 mt-3`, ss.e1]}>

      <H1 hasBorder>Major offensive {theme} random text to the end</H1>
      <p css={[tw` mt-2`, ss.e3]}>Written by adomas gaudi</p>
      <button css={[tw`px-4 py-1 mt-4`, ss.e2]} {...btnP}>
        theme
      </button>
      <FlyingButton />
    </div>
  )
}
