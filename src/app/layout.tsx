import Link from 'next/link'
import './css/globals.css'

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
        <header className="border-b">
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
        <div className="container mx-auto">
          {children}
        </div>
      </body>
    </html>
  )
}
