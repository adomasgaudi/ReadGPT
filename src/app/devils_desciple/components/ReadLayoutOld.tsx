'use client'
import { useRef, useState } from 'react'// @ts-expect-error
import tw, { css } from 'twin.macro'
import { Box, Flex, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCaretDown, faCaretUp, faXmark } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { fontNotoSerifJp } from '@/app/css/twinStyles'

function TextOrientate({ vertical, containerRef, text }: any) {
  const verticalTextStyle = css`-webkit-writing-mode: vertical-rl;
  -moz-writing-mode: vertical-rl;
  -ms-writing-mode: vertical-rl;
  writing-mode: vertical-rl;
  `
  // &&::-webkit-scrollbar {
  //   display: none;
  // }
  return (
    <div ref={containerRef} className="container pt-1 pl-5 text-xl w-full overflow-scroll grow max-h-[380px] " css={[fontNotoSerifJp]}>
      <p css={[vertical ? verticalTextStyle : '']} lang={vertical ? 'ja' : 'en'}>{divideBySentence(text).join(' ')}</p></div>
  )
}
const SidebarContainer = tw.div`absolute top-0 left-0 h-screen w-[85%] max-w-[400px] z-10 border-r `
const MenuButton = tw.button`fixed top-0 left-0 py-2 px-4 z-20`
const CloseButton = tw.button`py-2 px-4 mt-2`

function divideBySentence(givenText: string) {
  const sentences = givenText.split(/(。|！|？)/)
    .filter(sentence => sentence)
    .map(sentence => sentence.trim())

  const formattedSentences = []
  for (let i = 0; i < sentences.length; i += 2)
    formattedSentences.push(sentences[i] + (sentences[i + 1] || ''))

  return formattedSentences
}

export default function ReadLayout({ text, children }: any) {
  const [theme, setTheme] = useState(true)
  const containerRef = useRef(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [pagePart, setPagePart] = useState(1)
  // State for slider value
  const [sliderValue, setSliderValue] = useState(0)

  const allPages = text.reduce((acc: any, chapter: any) => acc.concat(chapter.pages), [])

  const [selectedPage, setSelectedPage] = useState(1)

  return (
    <div className="container mx-auto max-w-[1000px] h-[100%] max-h-[100%] flex flex-col">
      <header className='flex justify-between items-start container p-2 pl-5 pr-9 border-b border-gray-200'>
        <button className='' onClick={() => setIsSidebarOpen(true)}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <Link href="/">
          <div className=''>
            ReadGPT
          </div>
        </Link>
        <button className='' onClick={() => setTheme(prev => !prev)}>
          theme
        </button>
      </header>
      {isSidebarOpen && (
        <SidebarContainer css={['background: white;']}>
          <CloseButton onClick={() => setIsSidebarOpen(false)} className="absolute top-0 right-[-43px] border-2 rounded flex justify-center items-center h-10 w-10 ml-2" css={['background: white']}>
            <FontAwesomeIcon icon={faXmark} />
          </CloseButton>
          {children.sidebar}
        </SidebarContainer>
      )}

      <Flex className="w-full">
        <div className="w-full">
          <div className="flex justify-center">
            <button className=' rounded-full h-[50px] w-[50px]' onClick={() => setPagePart(prev => prev - 1)} disabled={pagePart === 1} >
              <FontAwesomeIcon icon={faCaretUp} />
            </button>
          </div>
          <div className="flex">
            <TextOrientate vertical={false} containerRef={containerRef} text={allPages[selectedPage - 1][pagePart - 1]} />

            <Box width="30px">
              <Slider
                aria-label="slider-ex-4"
                orientation="vertical"
                defaultValue={30}
                onChange={val => setSliderValue(val)}
                height="300px"
                css={css`
            opacity: 0.1;
            transition: opacity 0.3s ease-in-out;

            &:hover,
            &:focus,
            &:active {
              opacity: 1;
            }
          `}
              >
                <SliderTrack bg="gray.100">
                  <SliderFilledTrack bg="gray.200" />
                </SliderTrack>
                <SliderThumb boxSize={6}>
                  <Box color="gray.300" as="span">
                    {sliderValue}
                  </Box>
                </SliderThumb>
              </Slider>
            </Box>
          </div>
          <div className="flex justify-center">
            <button className=' rounded-full h-[50px] w-[50px]' onClick={() => setPagePart(prev => prev + 1)} disabled={pagePart === allPages[selectedPage - 1].length} >
              <FontAwesomeIcon icon={faCaretDown} />
            </button>
          </div>

          <div className="flex flex-row flex-nowrap max-w-full w-full overflow-scroll p-5 " css={[tw`border-2`]}>
            {allPages.map((item: any, idx: any) => (
              <button
                key={idx}
                className={`flex min-w-[40px] m-1 min-h-[40px] items-center justify-center border border-gray-200 ${selectedPage === item ? 'bg-gray-300' : ''}`}
                onClick={() => { setSelectedPage(idx + 1); setPagePart(1) }}
              >
                {idx + 1}
              </button>
            ))}

          </div>

          <div className="flex flex-col justify-end items-end grow" css={['background: red;']}>hi there</div>

        </div>
      </Flex>
    </div>
  )
}
