import './globals.css'

export const metadata = {
  title: 'Webcraft',
  description: 'Collect, build, achieve.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
