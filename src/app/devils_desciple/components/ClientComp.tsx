'use client'

import { ChakraProvider } from '@chakra-ui/react' // @ts-ignore
import { css } from 'twin.macro'

import { useWindowHeight } from '../utils/utils'
import ReadGPTLogic from './ReadGPTLogic'
import { useCssOutline } from '@/app/utils/useTools'

const ss = {
  e1stl: css`border-bottom: 1px solid #e2e8f0;`,
}

const DivScreenHeight = ({ children }: any) => {
  const height = useWindowHeight()
  return (<div style={{ height }}>{children}</div>)
}

//

//

//

//

//

export default function ClientComp() {
  useCssOutline(false)

  return (
    <ChakraProvider>
      <DivScreenHeight css={[ss.e1stl]} >
        <ReadGPTLogic />
      </DivScreenHeight>
    </ChakraProvider>
  )
}
