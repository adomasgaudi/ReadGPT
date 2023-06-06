'use client'

import { ChakraProvider } from '@chakra-ui/react' // @ts-ignore
import { css } from 'twin.macro'

import { useWindowHeight } from '../utils/utils'
import ReadLayoutNew from './ReadLayoutNew'

import { 悪魔の弟子 } from './text'
import { useCssOutline } from '@/app/utils/useTools'

// form - fcss
// look - lcss
// inside - icss
const lcss = css`border-bottom: 1px solid #e2e8f0;`

export default function ClientComp() {
  useCssOutline(true)
  const height = useWindowHeight()
  return (
    <ChakraProvider>
      <div css={[lcss]} style={{ height }}>
        <ReadLayoutNew text={悪魔の弟子} >
          <div>hi there</div>
        </ReadLayoutNew>
      </div>
    </ChakraProvider>
  )
}
