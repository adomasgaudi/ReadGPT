import { createRef, useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCaretDown, faCaretUp, faXmark } from '@fortawesome/free-solid-svg-icons'

import Link from 'next/link' // @ts-ignore
import tw, { css } from 'twin.macro'
import ReadINTInfra from './ReadINTInfra'
import { 悪魔の弟子 } from './text'
import { fontNotoSerifJp } from '@/app/css/twinStyles'

const textContent = 悪魔の弟子

const ss = {
  e1stl: css`border-bottom: 1px solid #e2e8f0;`,
  center: css`${tw`flex justify-center items-center`}`,
  e2stl: css`background: white; ${tw`border-2 rounded`}`,
  e2form: css`${tw`h-10 w-10`}`,
  e2loc: css`${tw`absolute top-0 right-[-43px] ml-2 mt-2`}`,
  e3in: css`${tw`flex justify-between items-start p-2 pl-5 pr-9`}`,
  e3stl: css` border-bottom: 1px solid #e2e8f0;`,
  e4stl: css`${tw`rounded-full`}`,
  e4form: css`${tw`h-[50px] w-[50px]`}`,
}

const ButtonSidebarClose = ({ setIsSidebarOpen }: any) =>
  <button
    css={[ss.e2form, ss.e2loc, ss.e2stl, ss.center]}
    onClick={() => setIsSidebarOpen(false)}
  >
    <FontAwesomeIcon icon={faXmark} />
  </button>

const ButtonDown = ({ pagePartPos, allPages, selectedPagePos, setPagePartPos }: any) =>
  <button
    css={[ss.e4stl, ss.e4form]}
    onClick={() => setPagePartPos(prev => prev + 1)}
    disabled={pagePartPos + 1 === allPages[selectedPagePos].length}
  >
    <FontAwesomeIcon icon={faCaretDown} />
  </button>
const ButtonUp = ({ pagePartPos, setPagePartPos }: any) =>
  <button
    css={[ss.e4stl, ss.e4form]}
    onClick={() => setPagePartPos((prev: any) => prev - 1)}
    disabled={pagePartPos === 0}
  >
    <FontAwesomeIcon icon={faCaretUp} />
  </button>

const gradientStyles = (deg: any) => css`
  background: rgb(255,255,255);
  background: linear-gradient(${deg}deg, var(--bg-main-opq) 20%, var(--bg-main-trn) 100%);
`

//

//

//

//

//

export default function ReadINT() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [pagePos, setPagePos] = useState(0)
  const [pagePartPos, setPagePartPos] = useState(0)
  const allPages = textContent.reduce((acc: any, chapter: any) => acc.concat(chapter.pages), [])

  const [selectedPagePos, setSelectedPagePos] = useState(1)
  const containerRef = useRef(null)
  const [heights, setHeights] = useState([])

  useEffect(() => {
    if (containerRef.current) {
      const scrollHeight = containerRef.current.scrollHeight
      const elementHeight = containerRef.current.offsetHeight
      const numberOfElements = allPages[pagePos].length
      console.log(scrollHeight, elementHeight, numberOfElements)

      const scrollPos = (scrollHeight - elementHeight) / (numberOfElements - 1) * pagePartPos

      containerRef.current.scrollTo({ top: scrollPos, behavior: 'smooth' })
    }
  }, [pagePartPos])

  const pageRefs = useRef([])
  pageRefs.current = allPages[pagePos].map((_, i) => pageRefs.current[i] ?? createRef())

  const scrollThreshold = 100 // The scroll threshold in pixels

  // Handle the scroll event
  const handleScroll = (e) => {
    // const { scrollTop } = e.target;
    // const nextElementIndex = heights.findIndex((height, i) => scrollTop >= height && scrollTop < heights[i+1]);

    // if(nextElementIndex >= 0 && nextElementIndex !== pagePartPos){
    //   setPagePartPos(nextElementIndex);
    // }
  }
  useEffect(() => {
    const currentHeights = pageRefs.current.map(ref => ref.current.offsetTop)
    setHeights(currentHeights)
  }, [])

  useEffect(() => {
    // Add the scroll event listener
    const scrollContainer = containerRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll)
      return () => {
        // Clean up the scroll event listener
        scrollContainer.removeEventListener('scroll', handleScroll)
      }
    }
  }, [containerRef])

  useEffect(() => {
    const currentRef = pageRefs.current[pagePartPos]
    if (currentRef && currentRef.current) {
      currentRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }, [pagePartPos])

  return (

    <ReadINTInfra
      text={textContent}
      {...{ isSidebarOpen }}
      childHeader={
        <>
          <button onClick={() => setIsSidebarOpen(true)}>
            <FontAwesomeIcon icon={faBars} />
          </button>
          <Link href="/">
            <div className=''>
              ReadGPT
            </div>
          </Link>
        </>
      }
      childSidebar={
        <>
          <ButtonSidebarClose {...{ setIsSidebarOpen }} />
          <div>
            hi sidebar
          </div>
        </>
      }
    >
      <div css={[tw`relative`]}>
        {pagePartPos !== 0
          && <div css={[tw`absolute top-0 w-full flex justify-center items-center -mb-10 z-10`, gradientStyles(180)]} >
            <ButtonUp {...{ setPagePartPos, pagePartPos }} />
          </div>
        }
        <div ref={containerRef} css={[tw`h-80 overflow-scroll`]}>
          {allPages[pagePos].map((page, index) => (
            <p
              ref={pageRefs.current[index]}
              key={index}
              css={[tw`text-xl`, tw`p-2 pt-8`, fontNotoSerifJp]}
            >
              {page}
            </p>
          ))}
        </div>
        {pagePartPos + 1 !== allPages[selectedPagePos].length
          && <div css={[tw`absolute bottom-10 w-full flex justify-center items-center -mb-10 z-10`, gradientStyles(0)]} >
            <ButtonDown {...{ setPagePartPos, pagePartPos, allPages, selectedPagePos }} />
          </div>
        }

      </div>
    </ ReadINTInfra>
  )
}
