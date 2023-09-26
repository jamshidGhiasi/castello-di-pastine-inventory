'use client'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, SearchIcon } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import TopLogo from "./layout/top-logo";
import Image from "next/image";
import Link from "next/link";
const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const router = useRouter()
    const onSearch = (event: React.FormEvent) => {
        event.preventDefault()
        const encodedSearchQuery = encodeURIComponent(searchQuery)
        router.push(`/search?q=${encodedSearchQuery}`)
        console.log(encodedSearchQuery)
    }
    return (
        <div className="sticky top-0 flex z-[20]  border-white w-full backdrop-blur-2xl  bg-[#2d3e38] p-4 border-b shadow-sm ">
            <Link href="/">
            <div className="bg-[#2d3e38] ">
                <Image src="/castello-di-pastine-icon.svg" className="mr-4" width={40} height={40} alt="" />
            </div>
            </Link>
        <form
            className="relative flex w-full max-w-lg  items-center space-x-2 ml-auto  "
            onSubmit={onSearch}
        >
            <Input
                type="text"
                className=" h-[46px] bg-white text-black rounded-full w-full  "
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchIcon className=" absolute right-4 w-6 h-6 text-black" />
           
        </form>
        </div>
    )
}
export default SearchBar;