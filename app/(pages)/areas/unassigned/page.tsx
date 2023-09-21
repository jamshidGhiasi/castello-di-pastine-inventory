import AntiqueItem from "@/components/antique-item";
import Layout from "@/components/layout/layout";
import fetchAntiquesWithUnassignedArea from "@/utils/fetchAntiquesWithUnassignedArea";

const UnassignedAreaPage = async () => {
    const antiques = await fetchAntiquesWithUnassignedArea()
    return (
        <Layout>
            <div className=" grid  grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4">
                    {antiques &&
                        antiques.map((antique: any) =>
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