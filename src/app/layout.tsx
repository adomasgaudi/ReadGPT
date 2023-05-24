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
      <body className='bg-main text-main'>
        <div className="container mx-auto h-full">
          {children}
        </div>
      </body>
    </html>
  )
}
