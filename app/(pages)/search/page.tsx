import AntiqueItem from "@/components/antique-item"
import Layout from "@/components/layout/layout"
import { ScrollArea } from "@/components/ui/scroll-area"
import searchAntiques from "@/utils/searchAntiques"
import type { Antique } from "@prisma/client"
import { Suspense } from "react"


export interface SearchPageProps {
  searchParams?: {
    q?: string
  }
}

const SearchPage = async (props: SearchPageProps) => {
  const { searchParams } = props
  const antiques = await searchAntiques(searchParams?.q as string)

  if (!antiques?.length) return <Layout><p>No data found!</p></Layout>

  return (
    <Layout>
     
      {antiques?.length !== 0 && <h4 className="font-bold text-lg mb-4">Found {antiques.length} items</h4>}
        <div className=" grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-6 mb-[300px] lg:mb-[150px]  ">
          
          {antiques?.map((antique: Antique) =>
          
            <AntiqueItem
              key={antique.id}
              description={antique.description}
              image={[
                `/antiques/image${antique.itemNo.replace('0', '')}.png`,
                `/antiques/image${antique.itemNo.replace('0', '')}-1.png`,
                `/antiques/image${antique.itemNo.replace('0', '')}-2.png`,
              ]}
              itemNo={antique.itemNo}
              height={antique.height}
              width={antique.width}
              depth={antique.depth}
              area={antique.areaId}
              room={antique.roomId}
              category={antique.categoryId}
            />
          
          )}
        </div>
  
    </Layout>
  )
}

export default SearchPage
