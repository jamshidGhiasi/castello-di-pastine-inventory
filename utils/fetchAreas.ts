import prisma from "@/lib/prisma";

const fetchAreas = async () => {
    try {

        const areas = await prisma.area.findMany({
            orderBy: {
                order: 'asc'
            },
            include: {
                _count: {
                    select: { antiques: true },
                },
                categories: true
            },
        });
        return areas;
    } catch (error) {
        console.error('Error caught at fetchAreas:', error);
        return null;
    }
}

export default fetchAreas;