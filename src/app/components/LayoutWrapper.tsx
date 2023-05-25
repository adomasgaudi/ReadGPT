'use client'
import React, { useState } from 'react'

const App = ({ children }: any) => {
  const [theme, setTheme] = useState(true)
  console.log(theme)

  return (
    <body className={`bg-main text-main ${theme ? 'dark' : 'light'}`}>
      <div className="container mx-auto h-full">
        <button className='pl-40' onClick={() => setTheme(prev => !prev)}>theme</button>
        {children}
      </div>
    </body>
  )
}

export default App
