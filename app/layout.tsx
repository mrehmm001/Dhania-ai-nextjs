import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ModalProvider } from '@/components/modal-provider'
import { ToasterProvider } from '@/components/toast-provider'
import { CrispProvider } from '@/components/crisp-provider'
import { ClerkProvider } from '@clerk/nextjs'

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
      <ClerkProvider>
        <html lang="en">
          {/* <CrispProvider/> temporary remove crisp */}
          <body className={inter.className}>
            <ModalProvider/>
            <ToasterProvider/>
            {children}
          </body>
        </html>
      </ClerkProvider>  
  )
}
