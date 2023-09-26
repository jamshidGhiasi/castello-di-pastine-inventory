import Layout from "@/components/layout/layout"
import { Loader2 } from "lucide-react"
const SearchPageLoading = () => {
  return (
    <Layout>
    <div className="flex flex-col w-full items-center justify-center h-[50vh] max-h-full">
        Searching Antiques...
        <Loader2 className="mr-2 h-24 w-24 animate-spin" />
    </div>
</Layout>
  )
}
export default SearchPageLoading
