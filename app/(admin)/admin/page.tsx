"use client"
import AdminLayout from "@/components/admin/layout";
import AdminSessionProvider from "@/components/admin/session-provider";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { useEffect, useState } from "react";
const Admin = () => {
    const { data: session, status } = useSession()
    console.log("SESSION", status)
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/test')
            .then((res) => res.json())
            .then((data) => {
                if (data.antiques) {
                    setData(data)
                    setLoading(false)    
                } else {
                    setData(data.error.errors)
                    setLoading(false)
                }
            })
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No antiques data</p>
    return (
        <AdminLayout>
            <div className=" w-full">

                <div className="flex items-center justify-between">
                    <Link href={'/'} className="flex items-center ">
                        <ChevronLeft />
                        Home
                    </Link>
                    {session &&
                        <div className="flex justify-between ">
                            <Avatar className="mr-2">
                                <AvatarImage src={session?.user?.image!} alt="@shadcn" />
                                <AvatarFallback>{session?.user?.name?.match(/\b\w/g)}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col items-start">

                                <span>{session?.user?.name}</span>
                                <Button className="text-xs h-5" onClick={() => { signOut({ callbackUrl: '/admin' }) }}>Sign Out</Button>
                            </div>

                        </div>
                    }
                    {!session &&
                        <div className="flex justify-between ">
                            <div className="flex flex-col items-start">


                                <Button className="text-xs h-5" onClick={() => { signIn('google', { callbackUrl: '/admin' }) }}>Sign In</Button>
                            </div>

                        </div>
                    }
                </div>
                <h1 className=" mb-4">
                    This is the <code className=" bg-slate-400 p-1 rounded-sm">/admin</code> page and only accessible to Admin
                </h1>

                <h2 className="mb-2 text-cyan-500">Components</h2>
                <p className=" left-0 top-0 flex flex-col w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                    <span>- Dynamic Data Table</span>
                    <span>- File Upload</span>
                    <span>- Access to main Google Sheet</span>
                    <span>- Refresh Google Sheet</span>
                    <span>- Sync with Prisma Postgres db</span>
                    <span>- CRUD on Prisma Postgres db</span>
                    <span>- Print</span>
                    <span>- Accessible via Google Auth - next-auth.js / maybe user Admin</span>
                </p>

                <div>
                    {(!isLoading && data) &&
                        (<div>
                            {JSON.stringify(data, undefined, 4)}
                        </div>)
                    }
                </div>
            </div>

        </AdminLayout>
    )
}
export default Admin;