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
  icons: [{ rel: 'icon', url: Favicon.src }],
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
      <body className="max-h-screen overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#273731] via-[#1f2c27] to-[#111815]">
        <AuthProvider session={session}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <Toaster />
          

            {children}
          
           
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
