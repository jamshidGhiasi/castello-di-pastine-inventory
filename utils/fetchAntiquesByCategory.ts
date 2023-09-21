import prisma from "@/lib/prisma";
const fetchAntiquesByCategory = async (category: string) => {
    try {
        const antiques = await prisma.antique.findMany({
            where: {
                categoryId: {
                    equals: category
                }
            },
            include: {
                room: true,
                area: true,
                category: true
            }
        });
        return antiques;
    }
    catch (error) {
        console.error('Error caught at fetchAntiquesByCategory:', error);
        return null;
    }
}
export default fetchAntiquesByCategory;