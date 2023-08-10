'use client'
// @ts-expect-error
import tw, { css, styled } from 'twin.macro'
import Link from 'next/link'
import { In_Center } from '../css/chunky'
import { Snappers } from '../css/twinstyles/snapper'

// import { useCssOutline } from '../utils/useTools'

const H1 = tw.h1`text-6xl`
// const Button_X1 = ({ className, ...props }: any) => <button className={`text-main border-main hover:bg-accent ${className}`} {...props} />
// const Button_X = tw(Button_X1)`border py-1 px-3 mr-3 mt-3 font-bold`
// // export const Button_X = ({ ...props }: any) => (
// //   <Button_X_ css={[
// //     'background: var(--bg-accent)',
// //   ]} {...props}/>
// // )

const hoverStyles = css`
  &&:hover {
    background: var(--accent);
    color: var(--heading-main);
  }
  background: var(--bg-main);
  color: var(--text-main);
  border-color: var(--text-main);
  `
// /* ${tw`text-black`} */
// const Input = () => (
//   <button css={[tw`border py-1 px-3 mr-3 mt-3 font-bold`, hoverStyles]} />
// )

const Button_X = styled.button(() => [
  tw`border py-1 px-3 mr-3 mt-3 font-bold`,
  hoverStyles,
])

const HomePage = () => {
  // useCssOutline(false)
  return (
    <Snappers.P3 cssIn={[tw``]}>
      <div css={tw`grid grid-cols-1 gap-4 md:grid-cols-2 min-h-[100vh]`}>
        <div css={tw`flex justify-center items-center`}>
          <h1 className='text-6xl -mt-40'>Elaborate Please</h1>
        </div>

        <In_Center className='flex flex-col w-full'>
          <div css={tw`-mt-40`}>
            <p>Elaborate is an experimental book <span css={tw`text-blue-400`}>powered by ChatGPT</span> that morphs under the user's request. Simplify the original work, replace it with a different language, and morph two languages together. Fluidity allows for exploration. Explore it as you please.</p>
          </div>
          {/* <div className='flex w-full '>
              <Button_X>Simplify</Button_X>
              <Button_X>French</Button_X>
            </div> */}
        </In_Center>
      </div>
      <div css={tw`min-h-[100vh] justify-center items-center text-center`}>
        <Link href="/">
          <H1 css={[hoverStyles, tw`p-2`]}>Please, explore</H1>
        </Link>
      </div>
    </Snappers.P3 >
  )
}

export default HomePage
