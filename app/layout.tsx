import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ModalProvider } from '@/components/modal-provider'
import { ToasterProvider } from '@/components/toast-provider'
import { CrispProvider } from '@/components/crisp-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dhania',
  description: 'Ai Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (   
      <html lang="en">
        <CrispProvider/>
        <body className={inter.className}>
          <ModalProvider/>
          <ToasterProvider/>
          {children}
        </body>
      </html>
  )
}
