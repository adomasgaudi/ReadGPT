import './css/allthat.css'
import { BodyLayer } from './BodyLayer'

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
      <BodyLayer>
        {children}
      </BodyLayer>
    </html>
  )
}
