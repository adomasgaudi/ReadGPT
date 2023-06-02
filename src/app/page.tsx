import Link from 'next/link'
// import { linkStyles } from './components/link'

const App = () => {
  // useCssOutline(false)
  return (
    <>
      <div className='pt-[100px]'>
        {[{ href: '/knyga2', title: 'JAP' }, { href: '/knyga', title: "Knyga" }].map((item, index) =>
          <Link key="index" href={item.href}>
            <div> {item.title}</div>
          </Link>
        )}
      </div>
    </>
  )
}

export default App
