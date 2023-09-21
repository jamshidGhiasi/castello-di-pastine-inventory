import prisma
 from "@/lib/prisma";
const fetchCategories = async () => {
    try {
        const categories = await prisma.category.findMany({
            include: {
                antiques: true,
                _count: {
                    select: { antiques: true },
                },
            },
        });
        return categories;
    }
    catch (error) {
        console.error('Error caught at fetchCategories:', error);
        return null;
    }
}

export default fetchCategories;