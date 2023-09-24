import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import BottomNavigation from '@/components/bottom-navigation'
import Background from '@/components/background-effect'
import AdminSessionProvider from '@/components/admin/session-provider'
import { Toaster } from 'react-hot-toast'

import  { Session } from 'next-auth'
import AuthProvider from '@/components/admin/session-provider'
import Favicon from '/public/favicon.ico';
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Castello Di Pastine',
  description: 'Castello Di Pastine Inventory management system.',
}

export default function RootLayout({
  children,
  session
}: {
  children: React.ReactNode,
  session: Session
}) {


  return (
    <html lang="en">
      <head>
      <link rel="icon" href="favicon.ico" />
      </head>
      <body className="bg-[#f3f2f0] pb-[90px] ">
        <AuthProvider session={session}>
          <ThemeProvider attribute="class" defaultTheme="default" >
            <Toaster />
          

            {children}
          
           
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
