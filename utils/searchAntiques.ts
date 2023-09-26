import prisma from "@/lib/prisma";

const searchAntiques = async (q:string) => {
    try {
        try {

            const area = await prisma.antique.findMany({
                where: {
                    OR: [
                      {
                        description: {
                          contains:q,
                          mode: 'insensitive'
                        },
                      },
                      {
                        itemNo: {
                          contains: q,
                          mode: 'insensitive'
                        },
                      },
                    ]
                  },
                  include: {
                    area: {
                      select: {
                        title: true,
                      },
                    },
                    category: {
                        select: {
                            title: true,
                          },
                    },
                    room: {
                        select: {
                            title: true,
                          },
                    }
                  },

            })
            .catch((error) =>  null )
            
            if (!area) {
                return null
            }
            return area
        } catch (error) {
            return null
        }
    } catch (error) {
        console.error('Error caught at fetchAntiques:', error);
        return null;
    }
}

export default searchAntiques;