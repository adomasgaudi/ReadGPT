'use client'
import tw from 'twin.macro'
import React, { useState } from 'react'
import { LevelContext } from '@/context/levelContext'

export const BodyLayer = ({ children }: any) => {
  const [theme, setTheme] = useState('light')

  console.log(theme)
  return (
    <LevelContext.Provider value={[theme, setTheme]}>
      <body className={theme === 'light' ? 'light' : 'dark'} css={tw`bg-[var(--bg-main)] text-[var(--text-main)]`}>
        {children}
      </body>
    </LevelContext.Provider>
  )
}
