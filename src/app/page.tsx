'use client'
import Link from 'next/link'

import tw from 'twin.macro' // eslint-disable-line
import { Container } from './css/chunky'
import { useCssOutline } from './utils/useTools'

const App = () => {
  useCssOutline(true)
  return (
    <>
      <Container tw='pt-[100px]'>
        <Link href="/moby_dick">
          <div tw='inline-block border p-10 mr-10'>
            Moby dick
          </div>
        </Link>
        <Link href="/the_great_gatsby">
          <div className='inline-block border p-10'>
            The Great Gatsby
          </div>
        </Link>
      </Container>
    </>
  )
}

export default App
