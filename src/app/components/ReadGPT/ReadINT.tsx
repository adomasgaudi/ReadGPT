import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faXmark } from '@fortawesome/free-solid-svg-icons'// @ts-ignore
import tw, { css } from 'twin.macro'
import SidebarHeader from '../SidebarHeader'

const ins = {
  center: css`${tw`flex justify-center items-center`}`,
  e3: css`${tw`flex justify-between items-start p-2 pl-5 pr-9`}`,
  e4: css`${tw`flex justify-between items-end p-2`}`,
}

const ss = {
  e1: css`border-bottom: 1px solid #e2e8f0;`,
  e2: css`background: white; ${tw`border-2 rounded`}`,
  e3: css` border-bottom: 1px solid #e2e8f0;`,
  e4: css`${tw`rounded-full`}`,
  e5: css`background: #f7f6f7; ${tw`border rounded-full border-[#000]`}`,
  border: css`border: 1px solid #e2e8f0;`,
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
//

//

//

//

//

export default function ReadINT({ child, useSidebar }: any) {
  const [isSidebarOpen, setIsSidebarOpen] = useSidebar
  const [isPagesVisible, setIsPagesVisible] = useState(false)
  const [isExtraVisible, setIsExtraVisible] = useState(0)
  const [isChoice, setIsChoice] = useState(0)

  return (

    <SidebarHeader
      {...{ isSidebarOpen }}
      childs={{
        header: <>
          {child.header}
        </>,
        sidebar: <>
          <ButtonSidebarClose {...{ setIsSidebarOpen }} />
          {child.sidebar}
        </>,
      }}
    >
      <div css={[tw`row-start-2 grid grid-rows-[1fr, 50px] max-w-[800px] mx-auto`]}>
        <div css={[tw`relative`]}>
          <div css={[tw`absolute w-full h-full z-20 pointer-events-none`]}>

            {child.buttons}
          </div>
          <div css={['background: white;', tw`row-start-1 grid grid-rows-[1fr] max-h-[500px] overflow-scroll relative`]}>
            <div css={[tw` row-start-1  `]}>
              {child.main}
              {/* {buttonUpLogic()}
            {buttonDownLogic()} */}

            </div>
          </div>
        </div>
        <div css={[tw`absolute`]}>
          {isPagesVisible && (child.pagesList)}
          {[
            { id: 1, text: <>{child.chatExtra}</> },
            { id: 3, text: <>{child.replaceExtra}</> },
          ].map(({ id, text }) =>
            isExtraVisible === id && <div key={id} css={[tw`border`]}>{text}</div>,
          )}
        </div>

        <div css={['', tw`row-start-2 grid grid-cols-4`]}>
          {isChoice === 0
            && <>
              <div
                css={[tw`col-span-1 `, ss.border]}
                onClick={() => {
                  setIsExtraVisible(prev => prev !== 1 ? 1 : 0)
                  setIsChoice(1)
                }}
              >chat</div>
              <div
                css={[tw`col-span-1 `, ss.border]}
                onClick={() => {
                  setIsExtraVisible(prev => prev !== 3 ? 3 : 0)
                  setIsChoice(3)
                }}
              >replace</div>
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
