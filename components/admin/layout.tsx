'use client'
import { ReactNode } from "react";
import Link from "next/link";
import { Home } from "lucide-react";
import UserAccount from "@/components/admin/admin-user-account";

export interface AdminLayoutProps {
  children: ReactNode
  title: React.ReactNode
}

const AdminLayout = (props: AdminLayoutProps) => {
    const { title, children } = props
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-4 sm:p-24">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
              <div>
                <div className="flex justify-between">
                  <div className="flex gap-6">
                    <Link href={'/'} className="flex justify-start items-center mb-8">
                      <Home className="w-6 h-6 cursor-pointer mr-2" />
                      Back to Home
                    </Link>
                    <Link href={'/admin'} className="flex justify-start items-center mb-8">
                      <Home className="w-6 h-6 cursor-pointer mr-2" />
                      Antiques
                    </Link><Link href={'/admin/areas'} className="flex justify-start items-center mb-8">
                      <Home className="w-6 h-6 cursor-pointer mr-2" />
                      Areas
                    </Link>
                    <Link href={'/admin/rooms'} className="flex justify-start items-center mb-8">
                      <Home className="w-6 h-6 cursor-pointer mr-2" />
                      Rooms
                    </Link>
                  </div>

                  <UserAccount />
                </div>

                <div>
                  <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    {title}
                  </h1>

                  {children}
                </div>
              </div>
            </div>
        </main>
    )
}

export default AdminLayout;
