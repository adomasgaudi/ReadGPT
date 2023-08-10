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
        <H1 css={tw`my-10 `}>
          Elaborate please
        </H1>
      </div>
      <div className='pt-[100px]'>
        {[
          { href: '/devils_desciple', title: '悪魔の弟子 The Devil\'s Desciple' },
          { href: '/alice_in_wonderland', title: 'Alice in Wonderland' },
        ].map((item, index) =>
          <Link key={index} href={item.href}>
            <div className="m-2 border p-2"> {item.title}</div>
          </Link>,
        )}
      </div>
    </Snappers.BrilliantBlockMaxW800P3>
  )
}

export default App
