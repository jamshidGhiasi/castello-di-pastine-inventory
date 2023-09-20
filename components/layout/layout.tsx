import { ReactNode, Suspense } from "react"
import BottomNavigation from "../bottom-navigation"
import TopLogo from "./top-logo"
import SearchBar from "../search-bar"

const Layout = ({
    children
}: {
    children: ReactNode
}) => {
    return (
        <main className="flex  flex-col items-center justify-between h-[100vh] border border-red-600 p-4 sm:p-24">
            <div className=" z-10 max-w-5xl w-full items-center justify-between border-yellow-400 lg:flex lg:flex-col ">
                <TopLogo />
                <SearchBar />
                
                {children}
                
                <BottomNavigation />
            </div>
        </main>
    )

}
export default Layout
