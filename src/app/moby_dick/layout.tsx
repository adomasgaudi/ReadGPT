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
      <body>

        {children}
      </body>
    </html>
  )
}
