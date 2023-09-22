'use client'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
        <form
            className="flex justify-center items-center w-full mt-8 mb-4"
            onSubmit={onSearch}
        >
            <Input
                type="text"
                className=" px-4 py-6 sm:px-5 bg-neutral-200 text-black  "
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </form>
    )
}
export default SearchBar;