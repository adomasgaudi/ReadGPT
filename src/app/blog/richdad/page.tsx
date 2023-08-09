'use client'
import tw from 'twin.macro'
import { useCssOutline } from '@/app/utils/useTools'

export default function Page() {
  useCssOutline(true)
  return (
    <div css={tw`container mx-auto`}>
      <div css={tw`max-w-[800px] mx-auto`}>
        <h1 css={tw`text-4xl`}>Rich dad poor dad</h1>
        <h2>lesson 1</h2>
        <p>Don't accumulate liabilities, invest in assets. Your passive income should dictate the magnitude of your expenses</p>
      </div>
    </div>
  )
}
