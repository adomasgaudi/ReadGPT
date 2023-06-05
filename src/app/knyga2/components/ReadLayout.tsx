'use client'
import { useRef, useState } from "react";
import tw, { css } from "twin.macro";
import { fontNotoSerifJp } from "@/app/css/twinStyles";
import { Box, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Flex } from "@chakra-ui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown, faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import Link from "next/link";

const TextOrientate = ({ vertical, containerRef, text }: any) => {
  const verticalTextStyle = css`-webkit-writing-mode: vertical-rl;
  -moz-writing-mode: vertical-rl;
  -ms-writing-mode: vertical-rl;
  writing-mode: vertical-rl;
  &&::-webkit-scrollbar {
    display: none;
  }
  `
  return (
    <div ref={containerRef} className="container pt-1 pl-5 text-xl w-full overflow-scroll h-[400px]" css={[fontNotoSerifJp]}>
      <p css={[vertical ? verticalTextStyle : ""]} lang={vertical ? 'ja' : 'en'}>{divideBySentence(text).join(" ")}<br />{divideBySentence(text).join(" ")}</p></div>
  )
}
const SidebarContainer = tw.div`absolute top-0 left-0 h-screen w-[85%] max-w-[400px] z-10 border-r `
const MenuButton = tw.button`fixed top-0 left-0 py-2 px-4 z-20`
const CloseButton = tw.button`py-2 px-4 mt-2`

function divideBySentence(text) {
  // Split text by "。", "！", "？", and map over the results to trim whitespace and add the punctuation back
  let sentences = text.split(/(。|！|？)/)
    .filter(sentence => sentence)
    .map(sentence => sentence.trim());

  // Combine every two elements into a single sentence (since split creates an element for the punctuation as well)
  let formattedSentences = [];
  for (let i = 0; i < sentences.length; i += 2) {
    formattedSentences.push(sentences[i] + (sentences[i + 1] || ''));
  }

  return formattedSentences;
}

export default function ReadLayout({ text, children }: any) {
  const [theme, setTheme] = useState(true)
  const containerRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  // State for slider value
  const [sliderValue, setSliderValue] = useState(0);

  // State for selected number
  const [selectedNumber, setSelectedNumber] = useState(1);

  // List of numbers
  const numbers = Array.from({ length: 16 }, (_, i) => i + 1);

  return (
    <div className="container mx-auto max-w-[1000px] h-full">
      <header className='flex justify-between container p-2 pl-5 pr-9 border-b border-gray-200'>
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

      <Flex className="w-full pb-[100px]">
        <div className="w-full">
          <div className="flex justify-center">
            <button className=' rounded-full h-[50px] w-[50px]'>
              <FontAwesomeIcon icon={faCaretUp} />
            </button>
          </div>
          <div className="flex">
            <TextOrientate vertical={true} containerRef={containerRef} text={text} />

            <Box width="30px">
              <Slider
                aria-label="slider-ex-4"
                orientation="vertical"
                defaultValue={30}
                onChange={(val) => setSliderValue(val)}
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
            <button className=' rounded-full h-[50px] w-[50px]'>
              <FontAwesomeIcon icon={faCaretDown} />
            </button>
          </div>

          <div className="flex flex-row flex-nowrap max-w-full w-full overflow-scroll p-5 " css={[tw`border-2`]}>
            {numbers.map(number => (
              <div
                key={number}
                className={`flex min-w-[40px] m-1 min-h-[40px] items-center justify-center border border-gray-200 ${selectedNumber === number ? 'bg-gray-300' : ''}`}
                onClick={() => setSelectedNumber(number)}
              >
                {number}
              </div>
            ))}
          </div>

        </div>
      </Flex>
    </div>
  );
}
