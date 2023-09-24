'use client'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import TopLogo from "./layout/top-logo";
import Image from "next/image";
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
        <div className="sticky top-0  border-white w-full backdrop-blur-2xl  bg-white p-4 border-b shadow-sm ">
            
        <form
            className="flex w-full max-w-sm items-center space-x-2 "
            onSubmit={onSearch}
        >
            <Input
                type="text"
                className=" h-[46px] bg-neutral-200 text-black rounded-full w-full  "
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
             <Button type="submit" variant="outline" size="icon" className=" h-[46px] w-[56px] rounded-full ">
                <Search className=" " />
             </Button>
        </form>
        </div>
    )
}
export default SearchBar;