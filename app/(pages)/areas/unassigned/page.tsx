import AntiqueItem from "@/components/antique/antique-item";
import Layout from "@/components/layout/layout";
import fetchAntiquesWithUnassignedArea from "@/utils/fetchAntiquesWithUnassignedArea";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic'

const UnassignedAreaPage = async () => {
    const antiques = await fetchAntiquesWithUnassignedArea()
    return (
        <Layout>
                 <div className='sticky top-[79px] bg-[#fff] min-h-[46px]  border-b py-2 px-4 mb-4 flex items-center justify-between shadow-sm w-full  mx-auto '>
       <div className='text-xs w-full max-w-5xl mx-auto flex items-center'>
          <Link href='/' className='hover:underline'>
            <Home className='inline-block w-4' />
          </Link>
          <ChevronRight className='inline-block w-4' />
          <Link href='/areas' className=' pointer-events-none' >Unassigned</Link>
       </div>
     </div>
            <div className=" grid  grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 w-full max-w-5xl mx-auto  px-4 pt-0">
                    {antiques &&
                        antiques.map((antique: any, i) =>
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
                                    itemNo={antique.itemNo}
                                    prevItemNo={antiques[i - 1]?.itemNo}
                                    nextItemNo={antiques[i + 1]?.itemNo}
                                    height={antique.height}
                                    width={antique.white}
                                    depth={antique.depth}
                                    area={'unassigned'}
                                    room={'unassigned'}
                                />

                        )
                        )
                    }
                </div>
        </Layout>

    );
};

export default UnassignedAreaPage;
