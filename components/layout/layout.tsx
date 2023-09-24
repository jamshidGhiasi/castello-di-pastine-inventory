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
        <main className="flex  flex-col items-center justify-between min-h-screen ">
            <div className=" z-10 max-w-5xl w-full items-center justify-between border-yellow-400 lg:flex lg:flex-col ">
             
                <SearchBar />
                
                <div className="p-4">

                {children}
                </div>
                
                <BottomNavigation />
            </div>
        </main>
    )

}
export default Layout
