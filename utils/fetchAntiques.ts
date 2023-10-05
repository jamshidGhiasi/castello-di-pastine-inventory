import prisma from "@/lib/prisma";

const fetchAntiques = async (areaId: string, roomId: string) => {
    try {
        try {

            const area = await prisma.antique.findMany({
                where: {
                    AND: [
                        {
                            roomId: {
                                equals: roomId
                            }
                        },
                        {
                            areaId: {
                                equals: areaId
                            }
                        },
                    ]
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

export default fetchAntiques;