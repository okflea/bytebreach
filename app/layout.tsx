import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'

const dm = DM_Sans({ weight: '500', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ByteBreach',
  description: 'ByteBreach',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={dm.className}>{children}</body>
    </html>
  )
}
