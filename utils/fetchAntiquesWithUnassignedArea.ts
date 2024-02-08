import prisma from "@/lib/prisma";

const fetchAntiquesWithUnassignedArea = async () => {
    try {
        const antiques = await prisma.antique.findMany({
            where: {
               areaId: {
                     equals: 'unassigned'
               }
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
    }catch (error) {
        console.error('Error caught at fetchAntiquesWithUnassignedArea:', error);
        return null;
    }

}

export default fetchAntiquesWithUnassignedArea;