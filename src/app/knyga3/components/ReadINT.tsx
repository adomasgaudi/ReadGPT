import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'

import Link from 'next/link' // @ts-ignore
import tw, { css } from 'twin.macro'
import ReadINTInfra from './ReadINTInfra'
import { 悪魔の弟子 } from './text'

const ss = {
  e1stl: css`border-bottom: 1px solid #e2e8f0;`,
  center: css`${tw`flex justify-center items-center`}`,
  e2stl: css`background: white; ${tw`border-2 rounded`}`,
  e2form: css`${tw`h-10 w-10`}`,
  e2loc: css`${tw`absolute top-0 right-[-43px] ml-2 mt-2`}`,
  e3in: css`${tw`flex justify-between items-start p-2 pl-5 pr-9`}`,
  e3stl: css` border-bottom: 1px solid #e2e8f0;`,
}

const ButtonSidebarClose = ({ setIsSidebarOpen }: any) =>
  <button
    css={[ss.e2form, ss.e2loc, ss.e2stl, ss.center]}
    onClick={() => setIsSidebarOpen(false)}
  >
    <FontAwesomeIcon icon={faXmark} />
  </button>

//

//

//

//

//

export default function ReadINT() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  return (

    <ReadINTInfra
      text={悪魔の弟子}
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
          <div>hi sidebar
          </div>
        </>
      }
    >
      <div>hi main</div>
    </ ReadINTInfra>
  )
}
