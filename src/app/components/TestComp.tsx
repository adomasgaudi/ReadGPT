'use client'
import styled, { css } from 'styled-components'
import tw, { theme } from 'twin.macro'

// import Header from "../layout/Header";
// import { ContainX } from "../share/bones/components/Contain";
// import Head from "../share/bones/components/Head";

function PP({ children }: any) {
  // @ts-ignore
  return <p css={css({ color: theme`colors.red.500` })}>{children}</p>
}

const Text = styled.h1`
  color: red;
`

const Text2 = styled.h1`
color: ${({ theme }) => theme.textCol};
`
const Tailwind = styled.h1`
${tw`text-red-400`}
`
const TW = tw.h1`
text-red-700
`
const E800 = styled.h1`
${tw`text-red-400 `}
`

// const PropsStyle = styled.input<any>(({ hasBorder }) => [
//   `color: red;`,
//   hasBorder && tw`border-red-800`,
// ]);

function Test() {
  return (
    <div>
      <h1>Test</h1>
      <h1 className="cap-thick">custom class</h1>
      <h1>none</h1>
      <p className="red">pure css</p>
      <p className="redd">pure css</p>
      <p className="text-red-500">tailwind works</p>
      <p tw="text-red-500">twin works</p>
      <Text>styled</Text>
      <Text2 theme={{ textCol: 'red' }}>styled theme text 2</Text2>
      <Tailwind>styled + tw</Tailwind>
      <TW>styled with TW</TW>
      <E800>800</E800>
      <PP>jojo pp</PP>
      {/* @ts-ignore */}
      <div theme={{ textCol: 'red' }}
        css={`
              color: ${({ theme }: any) => theme.textCol};
            `}
      >
        styled with css
      </div>
      <br />
      <button>change color</button>
      <h3>move mouse to change</h3>
      <div css={[tw`text-red-400`]}>css prop</div>
    </div>
  )
}

export default Test
