'use client'
import React, { useState } from 'react'// eslint-disable-next-line
import tw from 'twin.macro';

const SidebarContainer = tw.div`absolute top-0 left-0 h-screen w-[400px] z-10`
const MenuButton = tw.button`fixed top-0 left-0 py-2 px-4 z-20`
const CloseButton = tw.button`py-2 px-4 mt-2`

const SidebarWrap = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <>
      <div tw="relative">

        {isSidebarOpen && (
          <SidebarContainer>
            {/* Closing Button */}
            <CloseButton onClick={() => setIsSidebarOpen(false)}>Close</CloseButton>
          </SidebarContainer>
        )}

        <MenuButton onClick={() => setIsSidebarOpen(true)}>Menu</MenuButton>
        <div >
          <div >
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default SidebarWrap
