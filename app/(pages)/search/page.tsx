'use client'
import AntiqueItem from "@/components/antique-item"
import Layout from "@/components/layout.tsx/layout"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useSearchParams } from "next/navigation"
import userSWR from 'swr'
const fetchAntiques = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Something went wrong!');
    }
    return response.json();
}
const Search = () => {
    const searchParams = useSearchParams()
    const searchQuery = searchParams ? searchParams.get('q') : null;
    const { data, error, isLoading } = userSWR(`${process.env.NEXT_PUBLIC_API_BASE_URL}/search?q=` + searchQuery, fetchAntiques)
    console.log(searchQuery)
    return (
        <Layout>
            {isLoading && <p>Loading...</p>}
            {error && <p>Something went wrong!</p>}
            {!isLoading && !data && <p>No data yet!</p>}
            {!isLoading && data && data.length === 0 && <p>No data found!</p>}
            {!isLoading && data && data.length > 0 &&

          <ScrollArea className=" h-[80vh] lg:h-[70vh]">
            <div className=" grid  grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 mb-[300px] lg:mb-[150px]  ">
          
                {data &&
                    data.map((antique: any) =>
                    (
                       
                            <AntiqueItem
                            key={antique.id}
                                description={antique.description}
                                image={
                                    [
                                        `/antiques/image${antique.itemNo.replace('0', '')}.png`,
                                        `/antiques/image${antique.itemNo.replace('0', '')}-1.png`,
                                        `/antiques/image${antique.itemNo.replace('0', '')}-2.png`,
                                    ]
                                }
                                qr=""
                                itemNo={antique.itemNo}
                                height={antique.height}
                                width={antique.white}
                                depth={antique.depth}
                                area={antique.areaId}
                                room={antique.roomId}
                            />
                        
                    )
                    )
                }
            </div>
            </ScrollArea>
            }

        </Layout>
    )
}
export default Search
