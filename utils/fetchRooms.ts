import prisma from "@/lib/prisma"
const fetchRooms = async (areaId: string) => {
    try {
        if (areaId !== 'unassigned') {
            const area = await prisma.area.findUniqueOrThrow({
                where: {
                    slug: areaId
                },
                

                include: {
                    rooms: {
                        orderBy: {
                            order: 'asc'
                        },
                        include: {
                            antiques: true,
                            _count: {
                                select: { antiques: true },
                            },
                        },
                    },
                    _count: {
                        select: { antiques: true },
                    },
                }
            })
            if (!area) {
                return null
            }
            return area
        }
    } catch (error) {
        return null
    }
}
export default fetchRooms