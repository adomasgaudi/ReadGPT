import Link from 'next/link'
import SidebarWrap from './SidebarWrap'

export const metadata = {
  title: 'The big bad title',
  description: 'Website description goes here',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SidebarWrap>

          <div className="container mx-auto">
            {children}
          </div>
          <header className="border-t">
            <div className='container mx-auto flex flex-row justify-between py-3'>
              <Link href="/">
                <h3 className="text-xl">BookGPT</h3>
              </Link>
              <ul className='flex flex-row gap-3'>
                {/* <li>tab 1</li>
              <li>tab 2</li> */}
              </ul>
            </div>
          </header>
        </SidebarWrap>
      </body>
    </html>
  )
}
