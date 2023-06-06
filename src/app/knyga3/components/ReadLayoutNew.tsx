import { useState } from 'react' // @ts-expect-error
import tw, { css } from 'twin.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useWindowHeight } from '../utils/utils'

const stcss = {
  e1: css`background: red; ${tw`border-r`}`,
  e2: css`background: white; ${tw`border-2 rounded`}`,
}

const icss = {
  center: css`${tw`flex justify-center items-center`}`,
}
const formcss = {
  e2: css`${tw`h-10 w-10`}`,
}
const loccss = {
  e2: css`${tw`absolute top-0 right-[-43px] ml-2 mt-2`}`,
}

const SidebarContainer = tw.div`absolute top-0 left-0 w-[85%] max-w-[400px] z-10`

const SidebarClose = ({ setIsSidebarOpen }: any) => <button
  css={[loccss.e2, formcss.e2, stcss.e2, icss.center]}
  onClick={() => setIsSidebarOpen(false)}
>
  <FontAwesomeIcon icon={faXmark} />
</button>

export default function ReadLayoutNew({ children, text }: any) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const height = useWindowHeight()
  return (
    <>
      <button onClick={() => setIsSidebarOpen(true)}>
        <FontAwesomeIcon icon={faBars} />
      </button>

      {isSidebarOpen && (
        <SidebarContainer css={[stcss.e1]} style={{ height }}>
          <SidebarClose {...{ setIsSidebarOpen }} />
          {children}
        </SidebarContainer>
      )}
      hi there {children} </>
  )
}
