import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react";
const SearchBar = () => {
    return(
    <div className="flex w-full max-w-sm items-center space-x-2 mb-8">
        <Input type="text" placeholder="Search" />
        <Button type="submit" size="icon">
            <Search className="h-4 w-4"/>
        </Button>
      </div>
    )
}

export default SearchBar;