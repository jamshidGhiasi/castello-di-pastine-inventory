'use client'
import { ReactNode } from "react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-4 sm:p-24">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
              {children}
            </div>
        </main>
    )
}

export default AdminLayout;
