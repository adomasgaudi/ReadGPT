'use client'
import { useState } from 'react'
import LayoutWrapper from '../components/LayoutWrapper'
import '../css/allthat.css'
import { LevelContext } from '@/context/levelContext'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [theme, setTheme] = useState<any>('light')
  return (
    <LevelContext.Provider value={[theme, setTheme]}>
      <html lang="en">
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </html>
    </LevelContext.Provider>
  )
}
