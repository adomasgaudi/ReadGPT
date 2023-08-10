'use client'

import Link from 'next/link'
import tw from 'twin.macro'
import { useCssOutline } from './utils/useTools'
import { Snappers } from './css/twinstyles/snapper'
import { H1 } from './css/twinstyles/twinStyles'

//

//

//

//

//

// import { linkStyles } from './components/link'

const App = () => {
  useCssOutline(!true)
  return (
    <Snappers.BrilliantBlockMaxW800P3>
      <div css={tw`flex justify-between items-center `}>
        <Link href='/welcome' >
          <H1 css={tw`my-10 `}>
            Elaborate please
          </H1>
        </Link>
      </div>
      <div className='pt-[100px]'>
        {[
          {
            href: '/les_trois_mousquetaires',
            title: 'Les trois mousquetaires',
            translation: 'The Three Musketeers',
            lang: 'French',
            hot: 'I\'m Buggy!',
          },
          {
            href: '/',
            title: '悪魔の弟子',
            translation: 'Devil\'s Desciple',
            lang: 'Japanese',
            hot: 'Not yet!',
          },
          {
            href: '/',
            title: 'Custom text',
            translation: '',
            lang: '',
            hot: 'Not yet!',
          },
        ].map((item, index) =>
          <Link key={index} href={item.href} >
            <div css={tw`border rounded grid grid-cols-6 p-2 my-2 `}>

              <div className="col-span-5">
                <p css={tw`text-xl text-black`}>{item.title} <span css={tw`text-sm text-blue-400 italic`}>{item.lang}</span></p>
                <p css={tw`text-sm mt-0`}>{item.translation}</p>
              </div>
              <div><p css={tw`text-red-400`}>{item.hot}</p></div>
            </div>
          </Link>,
        )}
      </div>
    </Snappers.BrilliantBlockMaxW800P3>
  )
}

export default App
