'use client'
import Link from 'next/link'
import React, { useState } from 'react'

const App = ({ children }: any) => {
  // const [theme, setTheme] = useState(true)

  return (
    <body className={`bg-main text-main light`}>
      {children}
    </body>
  )
}

export default App
