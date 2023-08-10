'use client'
import React, { useContext } from 'react'
import tw from 'twin.macro'
import { LevelContext } from '@/context/levelContext'

const ss = {
  e1: tw`bg-[var(--bg-main)] text-[var(--text-main)]`,
}

const App = ({ children }: any) => {
  const [theme, setTheme] = useContext<any>(LevelContext)
  return (
    <body className={theme === 'light' ? 'light' : 'dark'} css={[ss.e1]}>
      {children}
    </body>
  )
}

export default App
