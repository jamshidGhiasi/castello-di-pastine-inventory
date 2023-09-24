'use client'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react";
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
        <div className="sticky top-0 flex  border-white w-full backdrop-blur-2xl  bg-[#2d3e38] p-4 border-b shadow-sm ">
            <Link href="/">
            <div className="bg-[#2d3e38] ">
                <Image src="/castello-di-pastine-icon.svg" className="mr-4" width={40} height={40} alt="" />
            </div>
            </Link>
        <form
            className="flex w-full max-w-sm items-center space-x-2 "
            onSubmit={onSearch}
        >
            <Input
                type="text"
                className=" h-[46px] bg-white text-black rounded-full w-full  "
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
           
        </form>
        </div>
    )
}
export default SearchBar;