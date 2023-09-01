import { ReactNode } from "react"
import BottomNavigation from "../bottom-navigation"
import TopLogo from "./top-logo"
import SearchBar from "../search-bar"
const Layout = ({
    children
}: {
    children: ReactNode
}) => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-4 sm:p-24">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex lg:flex-col">
                <TopLogo />
                <SearchBar/>
                {children}
                <BottomNavigation />
            </div>
        </main>

    )
}

export default Layout