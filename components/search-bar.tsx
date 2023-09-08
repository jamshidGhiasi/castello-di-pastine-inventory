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
            className="flex justify-center items-center w-full sm:w-1/2"
            onSubmit={onSearch}
        >
            <Input
                type="text"
                className="px-5 py-1 w-2/3 sm:px-5 sm:py-5 text-zinc-200 bg-zing-800 rounded-full"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </form>
    )
}
export default SearchBar;