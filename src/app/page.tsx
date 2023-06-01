import Link from 'next/link'

const App = () => {
  // useCssOutline(false)
  return (
    <>
      <div className='pt-[100px]'>
        <Link href="/moby_dick">
          <div className='inline-block border p-10 mr-10'>
            Moby dick
          </div>
        </Link>
        <Link href="/the_great_gatsby">
          <div className='inline-block border p-10'>
            The Great Gatsby
          </div>
        </Link>
        <Link href="/knyga">
          <div className='inline-block border p-10'>
            knyga
          </div>
        </Link>
      </div>
    </>
  )
}

export default App
