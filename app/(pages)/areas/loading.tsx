import Layout from "@/components/layout/layout"
import { Skeleton } from "@/components/ui/skeleton"

const AreasPageLoading = () => {
  return (
    <Layout>
          <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
    </Layout>
  )
}

export default AreasPageLoading
