'use client'
import Link from 'next/link'
import LayoutWrapper from '../components/LayoutWrapper'
import { useCssOutline } from '../utils/useTools'
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
  useCssOutline(true)
  return (
    <html lang="en">
      <LayoutWrapper>
        <SidebarWrap>
          <p>hi</p>
          <div className="container mx-auto">
            {children}
          </div>
          <header className="border-t">
            <div className='container mx-auto flex flex-row justify-between py-3'>
              <Link href="/">
                <h3 className="text-xl">BookGPT</h3>
              </Link>
            </div>
          </header>
        </SidebarWrap>
      </LayoutWrapper>

    </html>
  )
}
