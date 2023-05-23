'use client'

import Link from 'next/link'// eslint-disable-next-line
import tw from 'twin.macro'

const CardComp = ({ name, link, ...props }: any) => <Link href={`/${link}`}>
  <div tw="border p-10 inline m-10 rounded-xl" {...props}>{name}</div>
</Link>

function HomePage() {
  return (
    <>

      <div className="container mx-auto pb-[500px]">
        <section tw='my-[300px]'>
          <h1 tw="text-5xl">BookGPT</h1>
        </section>

        <section>
          {[{ name: 'Moby Dick', link: 'moby_dick' }].map((_, idx) => <CardComp key={idx} name={_.name} link={_.link} />
          )}
        </section>
      </div>
    </>
  )
}

export default HomePage
