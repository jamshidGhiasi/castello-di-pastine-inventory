import AntiqueItem from "@/components/antique-item"
import Layout from "@/components/layout/layout"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Antique } from "@prisma/client"

const searchAntiques = async (searchQuery?: string) => {
  if (!searchQuery) return

  try {
    const res = await fetch(`${process.env.API_BASE_URL}/search?q=${searchQuery}`)
    if (!res.ok) throw new Error('Failed to fetch data')
    return res.json()
  } catch (err) {
  	console.error('Error caught:', err)
  }
}

export interface SearchPageProps {
  searchParams?: {
    q?: string
  }
}

const SearchPage = async (props: SearchPageProps) => {
  const { searchParams } = props
  const antiques = await searchAntiques(searchParams?.q)

  if (!antiques?.length) return <Layout><p>No data found!</p></Layout>

  return (
    <Layout>
      <ScrollArea className="h-[80vh] lg:h-[70vh]">
        <div className=" grid  grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 mb-[300px] lg:mb-[150px]  ">
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
            />
          )}
        </div>
      </ScrollArea>
    </Layout>
  )
}

export default SearchPage
