import prisma from "@/lib/prisma";

const fetchAntiquesByRange = async (range: string) => {
    if (!range) return null;
    if (!range.length) return null;
    try {
        const antiques = await prisma.antique.findMany({
            where: {
                itemNo: {
                  in: [range.padStart(4, '0')]
                }
              },
              include: {
                room: {
                  select: {
                    title: true
                  }
                },
                area: {
                  select: {
                    title: true
                  }
                },
                category: {
                  select: {
                    title: true
                  }
                },
              },
          
        })
       
        return antiques;
    } catch (error) {
        console.error('Error caught at fetchAntiquesByRange:', error);
        return null;
    }
}

export default fetchAntiquesByRange;