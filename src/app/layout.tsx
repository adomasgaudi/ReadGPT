import './css/globals.css'
import LayoutWrapper from './LayoutWrapper'

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
      <body className={`bg-main text-main ${true ? 'dark' : 'light'}`}>
        <div className="container mx-auto h-full">
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </div>
      </body>
    </html>
  )
}
