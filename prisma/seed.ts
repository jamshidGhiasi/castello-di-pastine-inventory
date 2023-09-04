import prisma from '../lib/prisma'
import { data } from './sample'
import { rooms } from './samplerooms';

const antiques = data.antiques;
const areas = [
    {
        title: 'Villa Ground',
        slug: 'villa-ground'
    },
    {
        title: 'Villa 1st Floor',
        slug: 'villa-1st-floor'
    },
    {
        title: 'Villa 2nd Floor',
        slug: 'villa-2nd-floor'
    },
    {
        title: 'Colonica',
        slug: 'colonica'
    },
    {
        title: 'Other Rooms',
        slug: 'other-rooms'
    },
]

const categories = [
    {
        title: 'Furniture',
        slug: 'furniture'
    },
    {
        title: 'Lighting',
        slug: 'lighting'
    },
    {
        title: 'Paintings',
        slug: 'paintings'
    },
    {
        title: 'rugs-and-tapestries',
        slug: 'rugs-and-tapestries'
    },
    {
        title: 'Ornaments',
        slug: 'ornaments'
    },
    {
        title: 'Garden',
        slug: 'garden'
    },
]
async function main() {
    // await Promise.all(
    //     areas.map(async (area) => {
    //         await prisma.area.upsert({
    //             where: {
    //                 slug: area.slug
    //             },
    //             update: {},
    //             create: {
    //                 title: area.title,
    //                 slug: area.slug,
    //             },
    //         })
    //     })
    // )
    // await Promise.all(
    //     categories.map(async (category) => {
    //         await prisma.category.upsert({
    //             where: {
    //                 slug: category.slug
    //             },
    //             update: {},
    //             create: {
    //                 title: category.title,
    //                 slug: category.slug,
    //             },
    //         })
    //     })
    // )
    // await Promise.all(
    //     rooms.map(async (room) => {
    //         await prisma.room.upsert({
    //             where: {
    //                 slug: room.slug
    //             },
    //             update: {
    //                 roomNo: room.roomNo,
    //             },
    //             create: {
    //                 title: room.title,
    //                 slug: room.slug,
    //                 roomNo: room.roomNo,
    //                 area: {
    //                     connect: {
    //                         slug: room.areaId
    //                     }
    //                 }
    //             },
    //         })
    //     })
    // )

    await Promise.all(
        antiques.map(async (antique) => {
            await prisma.antique.upsert({
                where: {
                    itemNo: antique.itemNo
                },
                update: {},
                create: {
                    itemNo: antique.itemNo,
                    lot: antique.lot,
                    height: antique.height,
                    width: antique.width,
                    depth: antique.depth,
                    area: {
                        connect: {
                            slug: antique.areaId || ""
                        }
                    },
                    room: {
                        connect: {
                            slug: antique.roomId || ""
                        }
                    },
                    category: {
                        connect: {
                            slug: antique.categoryId || ""
                        }
                    },
                }
            })
        })
    )
    // const itemPromises = [];
    // for (const antique of data.antiques) {
    //     itemPromises.push(
    //         await prisma.antique.upsert({
    //             where: {
    //                 itemNo: antique.itemNo
    //             },
    //             update: {},
    //             create: {
    //                 itemNo: antique.itemNo,
    //                 lot: antique.lot,
    //                 height: antique.height,
    //                 width: antique.width,
    //                 depth: antique.depth,
    //                 area: {
    //                     connect: {
    //                         slug: antique.areaId || ""
    //                     }
    //                 },
    //                 room: {
    //                     connect: {
    //                         slug: antique.roomId || ""
    //                     }
    //                 },
    //                 category: {
    //                     connect: {
    //                         slug: antique.categoryId || ""
    //                     }
    //                 },
    //             }
    //         })
    //     )
    // }
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
