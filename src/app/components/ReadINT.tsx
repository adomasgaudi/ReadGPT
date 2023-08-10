import { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

// @ts-ignore
import tw, { css } from 'twin.macro'
import SidebarHeader from './SidebarHeader'

const ins = {
  center: css`${tw`flex justify-center items-center`}`,
  e3: css`${tw`flex justify-between items-start p-2 pl-5 pr-9`}`,
  e4: css`${tw`flex justify-between items-end p-2`}`,
  // e4: css`${tw`flex justify-center items-center `}`,
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

const ss = {
  e1: css`border-bottom: 1px solid #e2e8f0;`,
  e2: css`background: white; ${tw`border-2 rounded`}`,
  e3: css` border-bottom: 1px solid #e2e8f0;`,
  e4: css`${tw`rounded-full`}`,
  e5: css`background: #f7f6f7; ${tw`border rounded-full border-[#000]`}`,
  border: css`border: 1px solid #e2e8f0;`,
}

// const gradientStyles = (deg: any) => css`
//   background: red;
//   background: linear-gradient(
//     ${deg}deg, #f7f6f7 20%,
//     #f7f6f7aa 65%,
//     #f7f6f700 100%
//   );
//   `

// const ButtonUpBlock = ({ setPagePartPos, pagePartPos, setSelectedPagePos }: any) =>
//   <div css={[tw`absolute top-0 w-full -mb-10 z-10`, ins.center, gradientStyles(180)]} >
//     <button
//       css={[ss.e4, tw`h-[50px] w-[50px]`]}
//       onClick={() => {
//         setPagePartPos((prev: any) => prev - 1)
//         setSelectedPagePos((prev: any) => prev - 1)
//       }}
//       disabled={pagePartPos === 0}
//     >
//       <FontAwesomeIcon icon={faCaretUp} />
//     </button>
//   </div>

// const ButtonDownBlock = ({
//   setPagePartPos, pagePartPos, allPages, selectedPagePos, setSelectedPagePos, setIsPagesVisible,
// }: any) =>
//   <div css={[tw`absolute bottom-10 w-full -mb-10 z-10`, ins.e4, gradientStyles(0)]} >
//     <button css={[tw`w-[50px]`]}>

//     </button>
//     <button
//       css={[ss.e4, ss.e5, tw`w-[50px] m-2`]}
//       onClick={() => {
//         setPagePartPos((prev: any) => prev + 1)
//         setSelectedPagePos((prev: any) => prev + 1)
//       }}
//       disabled={pagePartPos + 1 === allPages[selectedPagePos].length}
//     >
//       <FontAwesomeIcon icon={faCaretDown} />
//     </button>
//     <button css={[tw`w-[50px]`, ss.e5]} onClick={() => setIsPagesVisible((prev: any) => !prev)}>
//       <FontAwesomeIcon icon={faBars} />
//     </button>
//   </div>

//

//

//

//

//

export default function ReadINT({ child, useIsSidebarOpen }: any) {
  const [isSidebarOpen, setIsSidebarOpen] = useIsSidebarOpen
  const [pagePos, setPagePos] = useState(0)
  const [pagePartPos, setPagePartPos] = useState(0)
  const [isPagesVisible, setIsPagesVisible] = useState(false)
  const [isExtraVisible, setIsExtraVisible] = useState(0)
  const [isChoice, setIsChoice] = useState(0)

  const [selectedPagePos, setSelectedPagePos] = useState(0)
  const containerRef = useRef(null)

  // useEffect(() => {
  //   if (containerRef.current) {
  //     const scrollHeight = containerRef.current.scrollHeight
  //     const elementHeight = containerRef.current.offsetHeight
  //     const numberOfElements = allPages[pagePos].length

  //     const scrollPos = (scrollHeight - elementHeight) / (numberOfElements - 1) * pagePartPos

  //     containerRef.current.scrollTo({ top: scrollPos, behavior: 'smooth' })
  //   }
  // }, [pagePartPos])

  // const buttonDownLogic = () => pagePartPos + 1 !== allPages[selectedPagePos].length
  //   && <ButtonDownBlock {...{
  //     setPagePartPos, setSelectedPagePos, pagePartPos, allPages, selectedPagePos, setIsPagesVisible,
  //   }}
  //   />
  // const buttonUpLogic = () => pagePartPos !== 0
  //   && <ButtonUpBlock {...{ setPagePartPos, setSelectedPagePos, pagePartPos }} />

  return (

    <SidebarHeader
      {...{ isSidebarOpen }}
      childHeader={
        <>
          {child.header}
        </>
      }
      childSidebar={
        <>
          <ButtonSidebarClose {...{ setIsSidebarOpen }} />
          {child.sidebar}
        </>
      }
    >
      <div css={[tw`row-start-2 grid grid-rows-[1fr, 50px] max-w-[800px] mx-auto relative`]}>
        <div css={['background: white;', tw`row-start-1 grid grid-rows-[1fr] max-h-[500px] overflow-scroll`]}>
          <div css={[tw` row-start-1 `]}>
            {child.main}
            {/* {buttonUpLogic()}
            {buttonDownLogic()} */}

          </div>
        </div>
        {child.buttons}
        <div css={[tw`absolute`]}>
          {isPagesVisible && (child.pagesList)}
          {[
            { id: 1, text: <>{child.chatExtra}</> },
            { id: 3, text: <>{child.replaceExtra}</> },
          ].map(({ id, text }) =>
            isExtraVisible === id && <div key={id} css={[tw`border`]}>{text}</div>,
          )}
        </div>

        <div css={[tw`row-start-2 grid grid-cols-2 md:grid-cols-4`]}>
          {isChoice === 0
            && <>
              <div
                css={[tw`col-span-1 flex justify-center items-center cursor-pointer`, ss.border]}
                onClick={() => {
                  setIsExtraVisible(prev => prev !== 1 ? 1 : 0)
                  setIsChoice(1)
                }}
              ><h3 css={tw`m-0`}>Basic Chat</h3> </div>
              <div
                css={[tw`col-span-1 flex justify-center items-center cursor-pointer `, ss.border]}
                onClick={() => {
                  setIsExtraVisible(prev => prev !== 3 ? 3 : 0)
                  setIsChoice(3)
                }}
              ><h3 css={tw`m-0`}>Replace Chat</h3></div>
            </>
          }

          {isChoice === 1 && <>
            <div
              css={[tw`col-span-3 `, ss.border]}
            >{child.chatInput}</div>
            <div
              css={[tw`col-span-1 `, ss.border]}
              onClick={() => setIsChoice(0)}
            >back</div>
          </>}

          {isChoice === 3 && <>
            <div
              css={[tw`col-span-3 `, ss.border]}
            >{child.replaceInput}</div>
            <div
              css={[tw`col-span-1 `, ss.border]}
              onClick={() => setIsChoice(0)}
            >back</div>
          </>}
        </div>

      </div>
    </ SidebarHeader >
  )
}
