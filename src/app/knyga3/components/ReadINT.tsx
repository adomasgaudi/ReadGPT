import { useEffect, useRef, useState } from 'react'
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

const Center = tw.div`flex justify-center items-center`
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

  useEffect(() => {
    if (containerRef.current) {
      const scrollHeight = containerRef.current.scrollHeight
      const elementHeight = containerRef.current.offsetHeight
      const numberOfElements = allPages[pagePos].length

      const scrollPos = (scrollHeight - elementHeight) / (numberOfElements - 1) * pagePartPos

      containerRef.current.scrollTo({ top: scrollPos, behavior: 'smooth' })
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
      <div>
        <Center>
          <ButtonUp {...{ setPagePartPos, pagePartPos }} />
        </Center>
        <div ref={containerRef} css={[tw`h-80 overflow-scroll`]}>
          {allPages[pagePos].map((page, index) => (
            <p key={index} css={[tw`bg-blue`, tw`p-2`, fontNotoSerifJp]}>{page}</p>
          ))}
        </div>
        <Center>
          <ButtonDown {...{ setPagePartPos, pagePartPos, allPages, selectedPagePos }} />
        </Center>
      </div>
    </ ReadINTInfra>
  )
}
