import Link from 'next/link'

// import { linkStyles } from './components/link'

const App = () => {
  // useCssOutline(false)
  return (
    <>
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
    </>
  )
}

export default App
