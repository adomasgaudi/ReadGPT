'use client'
import React, { useEffect, useState } from 'react'
import tw, { css, styled } from 'twin.macro'

import { moby_dick } from './text'

const Button_Arrow = tw.button`border rounded-xl bg-gray-200 p-5`

const Wrapper = styled.div`
  ${tw`h-[100px] invisible cursor-pointer`}
  &:hover {
    ${tw`visible`}
  }
`

const InteractiveButton = styled.button(({ isPressed }) => [
  tw`w-full`,
  tw`transition-all duration-1000 ease-in-out`,
  css`
    height: ${isPressed ? '100px' : '10px'};
    background-color: ${isPressed ? 'red' : 'transparent'};
  `,
])

const fetchApi = async (message: string) => {
  const response = await fetch('/api/response', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  })

  if (!response.ok)
    throw new Error(response.statusText)

  const data = await response.text()

  return data
}

const SidebarContainer = tw.div`absolute top-0 left-0 h-screen w-[400px] bg-gray-200 z-10`
const MenuButton = tw.button`fixed top-0 left-0 py-2 px-4 bg-blue-500 text-white z-20`
const CloseButton = tw.button`py-2 px-4 bg-red-500 text-white mt-2`

const App = () => {
  const [response, setResponse] = useState<string[]>([])
  const [showPopup, setShowPopup] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [mainText, setMainText] = useState<string>(moby_dick[currentPage].text)
  const [isButtonPressed, setIsButtonPressed] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleButtonPress = () => {
    setIsButtonPressed(true)
  }
  const handleButtonRelease = () => {
    setIsButtonPressed(false)
    flipPage(1) // flip to the next page when button is released.
  }
  const flipPage = (val: number) => {
    const newPage = currentPage + val
    if (newPage >= 0 && newPage < moby_dick.length) {
      setCurrentPage(newPage)
      setMainText(moby_dick[newPage].text)
    }
  }

  const clearLocalStorage = () => {
    localStorage.removeItem('authorInfo')
    setShowPopup(true)
  }

  const getAuthorInfo = async () => {
    const localStorageData = localStorage.getItem('authorInfo')
    if (localStorageData) {
      setMainText(localStorageData)
    }
    else {
      const message = 'give me info on the author of moby dick'
      const data = await fetchApi(message)
      localStorage.setItem('authorInfo', data)
      setMainText(data)
    }
  }

  const sayHiInLithuanian = async () => {
    const message = 'say hi in lithuanian'
    const data = await fetchApi(message)
    setResponse(prev => [...prev, data])
  }

  useEffect(() => {
    console.log({ response })
  }, [response])

  return (
    <>
      <div tw='max-w-[1000px] mx-auto'>
        {isSidebarOpen && (
          <SidebarContainer>
            <CloseButton onClick={() => setIsSidebarOpen(false)}>Close</CloseButton>
            <button tw="border inline-block p-5 rounded-xl my-[100px]" onClick={getAuthorInfo}>Author</button>
            <button onClick={clearLocalStorage}>🔄</button>
            <div className='flex justify-center'>
              <button className="border m-3 p-3 rounded-xl text-blue-800 bg-blue-300" onClick={sayHiInLithuanian}>submit now</button>
              {response.map((res, index) => (
                <h3 key={index}>
              GPT Response: {res}
                </h3>
              ))}
            </div>
          </SidebarContainer>
        )}

        <MenuButton onClick={() => setIsSidebarOpen(true)}>Menu</MenuButton>
        <div className='mt-[50px] px-[5%] font-eb-garamond text-[#333] font-[400] leading-9 text-2xl'>{mainText}</div>

        <div className='w-full flex justify-between'>
          <Button_Arrow onClick={() => flipPage(-1)}>{'<-'}</Button_Arrow>
          <Button_Arrow onClick={() => flipPage(1)}>{'->'}</Button_Arrow>
        </div>

        {showPopup
          && <div className='bg-green-200 text-green-700'>
            Successful refresh
            <button onClick={() => setShowPopup(false)}> Dismiss </button>
          </div>
        }
      </div>
    </>
  )
}

export default App
