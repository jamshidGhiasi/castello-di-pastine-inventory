import Layout from "@/components/layout/layout"
import { Skeleton } from "@/components/ui/skeleton"
import { Loader2 } from "lucide-react"
const RoomPageLoading = () => {
  return (
    <Layout>
     <div className="flex flex-col w-full h-full border">

      Loading Antiques...
      <Loader2 className="mr-2 h-24 w-24 animate-spin" />
     </div>
    </Layout>
  )
}
export default RoomPageLoading
