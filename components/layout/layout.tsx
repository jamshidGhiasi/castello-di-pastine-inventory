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
        <main className="flex  flex-col items-center justify-between min-h-screen w-full ">
            <div className=" z-10  w-full items-center justify-between lg:flex lg:flex-col ">
             
                <SearchBar />
                
                <div className="p-4 w-full  max-w-5xl ">

                {children}
                </div>
                
                <BottomNavigation />
            </div>
        </main>
    )

}
export default Layout
