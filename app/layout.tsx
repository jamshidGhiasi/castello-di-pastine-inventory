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

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
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
      <body className=" max-h-screen overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black">
        <AuthProvider session={session}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <Toaster />
            {children}
            <Background />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
