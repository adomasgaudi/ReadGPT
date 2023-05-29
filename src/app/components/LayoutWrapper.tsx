'use client'
import React, { useState } from 'react'

const App = ({ children }: any) => {
  const [theme, setTheme] = useState(true)

  return (
    <body className={`bg-main text-main ${theme ? 'dark' : 'light'}`}>
      <div className="container mx-auto max-w-[1000px] h-full">
        <header className='flex justify-end'>
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
