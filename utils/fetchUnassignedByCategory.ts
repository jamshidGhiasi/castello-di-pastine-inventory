import prisma from "@/lib/prisma";

const fetchUnassignedByCategory = async (categoryId: string) => {
    try {
        const antiques = await prisma.antique.findMany({
            where: {
                AND: [
                    {
                        areaId: {
                            equals: 'unassigned'
                        },
                        categoryId: {
                            equals: categoryId
                        }
                    }
                ]

            },
            orderBy: [
                {
                    itemNo: 'asc'
                }
            ],
            include: {
                room: true,
                area: true,
                category: true
            }
        });
        return antiques;
    } catch (error) {
        console.error('Error caught at fetchUnassignedByCategory:', error);
        return null;
    }

}

export default fetchUnassignedByCategory;