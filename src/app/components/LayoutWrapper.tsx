'use client'
import Link from 'next/link'
import React, { useState } from 'react'

const App = ({ children }: any) => {

  return (
    <body className={`bg-main text-main light`}>
      {children}
    </body>
  )
}

export default App
