'use client'

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"
import AdminLayout from "./layout"

const CustomSessionProvider = (
    { children, session } : { children: ReactNode, session: any}
) => {
    return(
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
    )
}
export default CustomSessionProvider
