// @ts-expect-error
import tw, { css } from 'twin.macro'
import { useWindowHeight } from '../utils/utils'

const ss = {
  center: css`${tw`flex justify-center items-center`}`,
  e1stl: css`background: lightgray; ${tw`border-r z-20`}`,
  e2stl: css`background: white; ${tw`border-2 rounded`}`,
  e2form: css`${tw`h-10 w-10`}`,
  e2loc: css`${tw`absolute top-0 right-[-43px] ml-2 mt-2`}`,
  e3in: css`${tw`flex justify-between items-start p-2 pl-5 pr-9`}`,
  e3stl: css`${tw`border-b border-gray`}`,
}

const SidebarContainer = tw.div`absolute top-0 left-0 w-[85%] max-w-[400px] z-10`

export default function ReadINTInfra({ children, childHeader, childSidebar, isSidebarOpen }: any) {
  const height = useWindowHeight()

  return (
    <>
      <header css={[ss.e3in, ss.e3stl]}>
        {childHeader}
      </header>

      {isSidebarOpen && (
        <SidebarContainer css={[ss.e1stl]} style={{ height }}>
          {childSidebar}
        </SidebarContainer>
      )}
      {children}
    </>
  )
}
