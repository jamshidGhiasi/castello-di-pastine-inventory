'use client'
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
const UserAccount = () => {
    const onUseSession = useSession()
    const { data: session } = onUseSession
    return (
        <div className="flex flex-col items-start">
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
        </div>
    )
}
export default UserAccount