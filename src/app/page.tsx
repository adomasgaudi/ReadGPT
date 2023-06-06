import Link from 'next/link'
// import { linkStyles } from './components/link'

const App = () => {
  // useCssOutline(false)
  return (
    <>
      <div className='pt-[100px]'>
        {[
          { href: '/knyga', title: "functionality" },
          { href: '/knyga2', title: 'Nice layout' },
          { href: '/knyga3', title: "new guy" }
        ].map((item, index) =>
          <Link key="index" href={item.href}>
            <div className="m-2 border p-2"> {item.title}</div>
          </Link>
        )}
      </div>
    </>
  )
}

export default App
