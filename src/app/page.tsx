'use client'
import Link from 'next/link'
import tw from 'twin.macro'
import { Div_HScreen, In, In_Center, In_WHalf } from './css/chunky'
import { useCssOutline } from './utils/useTools'

const H1 = tw.h1`text-6xl`
const Button_X1 = ({ className, ...props }: any) => <button className={`text-main bg-main ${className}`} {...props} />
const Button_X = tw(Button_X1)`py-1 px-3 mr-3 mt-3 font-bold`

const HomePage = () => {
  useCssOutline(true)
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
              <p>ReadGPT is a book that morphs under the users request. Simplify the original work, replace it with a different language, morph two languages together. Fluidity allows for exploration. Only you know what you want from this read. Read! </p>
            </div>
            <div className='flex w-full '>
              <Button_X>simplify</Button_X>
              <Button_X>japanese</Button_X>
            </div>
          </In_Center>
        </In_WHalf>
      </Div_HScreen>

      <Div_HScreen className='flex flex-row justify-center items-center'>
        <Link href="/home">
          <H1 className='hover:bg-[#619ee7] p-1'>Explore</H1>
        </Link>
      </Div_HScreen>
    </In>
  )
}

export default HomePage
