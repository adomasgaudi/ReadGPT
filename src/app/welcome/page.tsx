'use client'
import Link from 'next/link' // @ts-expect-error
import tw, { css, styled } from 'twin.macro'
import { Div_HScreen, In, In_Center, In_WHalf } from '../css/chunky'

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
    background: var(--accent-main);
    color: var(--accent-text);
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
    <In>
      <Div_HScreen className='flex flex-col md:flex-row'>
        <In_WHalf>
          <In_Center>
            <h1 className='text-6xl'>ReadGPT</h1>
          </In_Center>
        </In_WHalf>

        <In_WHalf className='p-5'>
          <In_Center className='flex flex-col w-full'>
            <div>
              <p>ReadGPT is an experimental AI enhanced book-reading website. ReadGPT can help the readers with any questions they might have while reading a book, as well as the ability to morph the orginal version to aid in foreign language comprehension.</p>
              <p>
                For now the working features are:
                <ul>
                  <li>
                    standard chat bot for any conversation
                  </li>
                  <li>
                    Ability to replace original text by detailing the alteration
                  </li>
                </ul>
              </p>
              <p>
                Upcoming soon features:
                <ul>
                  <li>
                    Buttons for specific common prompts
                  </li>
                  <li>
                    Added functionality of text via gpt generated json. First use will be to generate furigana or color words by difficulty.
                  </li>
                </ul>
              </p>
              <p>
                Upcoming future features:
                <ul>
                  <li>
                    Smartphone selected text keyboard extra buttons.
                  </li>
                </ul>
              </p>
            </div>

            <div className='flex w-full '>
              <Button_X>simplify</Button_X>
              <Button_X>japanese</Button_X>
            </div>
          </In_Center>
        </In_WHalf>
      </Div_HScreen>

      <Div_HScreen className='flex flex-row justify-center items-center'>
        <Link href="/">
          <H1 css={[hoverStyles, tw`p-2`]}>Explore</H1>
        </Link>
      </Div_HScreen>
    </In>
  )
}

export default HomePage
