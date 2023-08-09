import LayoutWrapper from '../components/LayoutWrapper'
import '../css/allthat.css'

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
      <LayoutWrapper>
        {children}
      </LayoutWrapper>
    </html>
  )
}
