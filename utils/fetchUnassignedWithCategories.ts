import prisma from "@/lib/prisma";

const fetchUnassignedWithCategories = async () => {
    try {
        const antiques = await prisma.antique.groupBy({
            by: ['categoryId']
        });
        
        return antiques;
    }catch (error) {
        console.error('Error caught at fetchUnassignedWithCategories:', error);
        return null;
    }

}

export default fetchUnassignedWithCategories;