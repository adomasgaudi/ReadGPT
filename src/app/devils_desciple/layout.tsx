import '../css/globals.css'

export const metadata = {
  title: 'Elaborate',
  description: 'Read with GPT-3.5',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
