'use client'
import Link from 'next/link'
import React, { useState } from 'react'

const App = ({ children }: any) => {
  const [theme, setTheme] = useState(true)

  return (
    <body className={`bg-main text-main ${theme ? 'light' : 'dark'}`}>
      <div className="container mx-auto max-w-[1000px] h-full">
        <header className='flex justify-between container p-2 pl-5 pr-9 border-b border-gray-200'>
          <Link href="/">
            <div className=''>
              BookGPT
            </div>
          </Link>
          <button className='' onClick={() => setTheme(prev => !prev)}>
            theme
          </button>
        </header>
        {children}
      </div>
    </body>
  )
}

export default App
