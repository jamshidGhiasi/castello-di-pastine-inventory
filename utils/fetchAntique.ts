import prisma from "@/lib/prisma";

const fetchAntique = async (itemNo: string) => {
    if (!itemNo) return null
    try {
        try {

          const item = await prisma.antique.findUniqueOrThrow({
            where: {
                itemNo: itemNo
                },
                include: {
                    category: {
                        select: {
                            title: true,
                        }
                    },
                    area: {
                        select: {
                            title: true,
                        }
                    },
                    room: {
                        select: {
                            title: true,
                        }
                    },
                }
          })

          return item
            
        } catch (error) {
            return null
        }
    } catch (error) {
        console.error('Error caught at fetchAntique:', error);
        return null;
    }
}

export default fetchAntique;