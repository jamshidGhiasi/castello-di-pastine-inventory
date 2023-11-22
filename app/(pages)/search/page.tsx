import AntiqueItem from "@/components/antique/antique-item"
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

  if (!antiques?.length) return <Layout><div className="w-full p-4 max-w-5xl mx-auto"><h4 className="font-bold text-lg">No Items Found</h4></div></Layout>

  return (
    <Layout>

      {antiques?.length !== 0 && <div className="w-full p-4 max-w-5xl mx-auto"><h4 className="font-bold text-lg">Found {antiques.length} items</h4></div>}
      <div className=" grid  grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 w-full p-4 pt-0  max-w-5xl mx-auto">
                {antiques &&
                    antiques.map((antique: any, i) =>
                    (
                        <AntiqueItem
                            key={antique.id}
                            description={antique.description}
                            image={
                                [
                                    `/antiques/image${antique.itemNo.replace(/^0/, '').replace('/([a-z])/g', '')}.jpg`,
                                ]
                            }
                            itemNo={antique.itemNo}
                            prevItemNo={antiques[i - 1]?.itemNo}
                            nextItemNo={antiques[i + 1]?.itemNo}
                            height={antique.height}
                            width={antique.width}
                            depth={antique.depth}
                            area={antique.area.title}
                            room={antique.room.title}
                        />

                    )
                    )
                }
            </div>

    </Layout>
  )
}

export default SearchPage
