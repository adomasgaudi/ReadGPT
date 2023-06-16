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
  // e4: css`${tw`flex justify-center items-center `}`,
}

const ss = {
  e1: css`border-bottom: 1px solid #e2e8f0;`,
  e2: css`background: white; ${tw`border-2 rounded`}`,
  e3: css` border-bottom: 1px solid #e2e8f0;`,
  e4: css`${tw`rounded-full`}`,
  e5: css`background: var(--bg-main); ${tw`border rounded-full border-[#000]`}`,
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
  background: linear-gradient(
    ${deg}deg, var(--bg-main-opq) 20%, 
    var(--bg-main-semi-opq) 65%, 
    var(--bg-main-trn) 100%
  );
  `

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
  setPagePartPos, pagePartPos, allPages, selectedPagePos, setSelectedPagePos, setIsPagesVisible,
}: any) =>
  <div css={[tw`absolute bottom-10 w-full -mb-10 z-10`, ins.center, gradientStyles(0)]} >
    <button css={[tw`w-[50px]`]}>

    </button>
    <button
      css={[ss.e4, ss.e5, tw` w-[50px] m-2`]}
      onClick={() => {
        setPagePartPos((prev: any) => prev + 1)
        setSelectedPagePos((prev: any) => prev + 1)
      }}
      disabled={pagePartPos + 1 === allPages[selectedPagePos].length}
    >
      <FontAwesomeIcon icon={faCaretDown} />
    </button>
    <button css={[tw`w-[50px]`, ss.e5]} onClick={() => setIsPagesVisible((prev: any) => !prev)}>
      <FontAwesomeIcon icon={faBars} />
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
  const [isPagesVisible, setIsPagesVisible] = useState(false)
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
      setPagePartPos, setSelectedPagePos, pagePartPos, allPages, selectedPagePos, setIsPagesVisible,
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
      {isPagesVisible && (
        <div className="flex flex-row flex-nowrap max-w-full w-full overflow-scroll p-5 " css={[tw`border-2`]}>
          {allPages.map((item: any, idx: any) => (
            <button
              key={idx}
              className={`flex min-w-[40px] m-1 min-h-[40px] items-center justify-center border border-gray-200 ${selectedPagePos + 1 === item ? 'bg-gray-300' : ''}`}
              onClick={() => {
                setSelectedPagePos(idx + 1)
                setPagePartPos(0)
              }}
            >
              {idx + 1}
            </button>
          ))}

        </div>)}
    </ ReadINTInfra >
  )
}
