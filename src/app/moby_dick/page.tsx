'use client'
import React from 'react'
import { useCssOutline } from '../utils/useTools'
import { textend } from './textend'

const App = () => {
  useCssOutline(true)
  const isJP = false
  return (
    <>
      <div className={`mt-[50px] px-[5%] text-[#333] font-[400] leading-9 text-2xl ${isJP ? 'font-noto-serif-jp' : 'font-eb-garamond'} text-read`}>{textend}</div>
    </>
  )
}

export default App
