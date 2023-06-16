import { createRef, useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCaretDown, faCaretUp, faXmark } from '@fortawesome/free-solid-svg-icons'

import Link from 'next/link' // @ts-ignore
import tw, { css } from 'twin.macro'
import ReadINTInfra from './ReadINTInfra'
import { 悪魔の弟子 } from './text'
import { fontNotoSerifJp } from '@/app/css/twinStyles'

const textContent = 悪魔の弟子
const ins = {
  center: css`${tw`flex justify-center items-center`}`,
  e3: css`${tw`flex justify-between items-start p-2 pl-5 pr-9`}`,
}

const ss = {
  e1: css`border-bottom: 1px solid #e2e8f0;`,
  e2: css`background: white; ${tw`border-2 rounded`}`,
  e3: css` border-bottom: 1px solid #e2e8f0;`,
  e4: css`${tw`rounded-full`}`,
}

const ButtonSidebarClose = ({ setIsSidebarOpen }: any) =>
  <button
    css={[
      tw`h-10 w-10`,
      tw`absolute top-0 right-[-43px] ml-2 mt-2`,
      ss.e2, ins.center,
    ]}
    onClick={() => setIsSidebarOpen(false)}
  >
    <FontAwesomeIcon icon={faXmark} />
  </button>
const gradientStyles = (deg: any) => css`
  background: red;
  background: linear-gradient(${deg}deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%);`

const ButtonUpBlock = ({ setPagePartPos, pagePartPos, setSelectedPagePos }: any) =>
  <div css={[tw`absolute top-0 w-full -mb-10 z-10`, ins.center, gradientStyles(180)]} >
    <button
      css={[ss.e4, tw`h-[50px] w-[50px]`]}
      onClick={() => {
        setPagePartPos((prev: any) => prev - 1)
        setSelectedPagePos((prev: any) => prev - 1)
      }}
      disabled={pagePartPos === 0}
    >
      <FontAwesomeIcon icon={faCaretUp} />
    </button>
  </div>

const ButtonDownBlock = ({
  setPagePartPos, pagePartPos, allPages, selectedPagePos, setSelectedPagePos,
}: any) =>
  <div css={[tw`absolute bottom-10 w-full -mb-10 z-10`, ins.center, gradientStyles(0)]} >
    <button
      css={[ss.e4, tw`h-[50px] w-[50px]`]}
      onClick={() => {
        setPagePartPos((prev: any) => prev + 1)
        setSelectedPagePos((prev: any) => prev + 1)
      }}
      disabled={pagePartPos + 1 === allPages[selectedPagePos].length}
    >
      <FontAwesomeIcon icon={faCaretDown} />
    </button>
  </div>

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

  const [selectedPagePos, setSelectedPagePos] = useState(0)
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

  const pageRefs = useRef([])
  pageRefs.current = allPages[pagePos].map((_, i) => pageRefs.current[i] ?? createRef())

  useEffect(() => {
    const currentRef: any = pageRefs.current[pagePartPos]
    currentRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }, [pagePartPos])

  const buttonDownLogic = () => pagePartPos + 1 !== allPages[selectedPagePos].length
    && <ButtonDownBlock {...{
      setPagePartPos, setSelectedPagePos, pagePartPos, allPages, selectedPagePos,
    }}
    />
  const buttonUpLogic = () => pagePartPos !== 0
    && <ButtonUpBlock {...{ setPagePartPos, setSelectedPagePos, pagePartPos }} />

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
        {buttonUpLogic()}
        <div ref={containerRef} css={[tw`h-[400px] overflow-scroll`]}>
          {allPages[pagePos].map((page: any, index: any) => (

            <div ref={pageRefs.current[index]} key={index}>
              <p css={[
                index !== selectedPagePos && 'color: lightgray;',
                tw`text-xl `,
                tw`p-2 pt-8`,
                fontNotoSerifJp]}
              >
                {page}
              </p>
            </div>

          ))}
        </div>
        {buttonDownLogic()}

      </div>
    </ ReadINTInfra >
  )
}
