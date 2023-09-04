import prisma from '../lib/prisma'
import { data } from './sample'





async function main() {

//     const promises = [];
//   promises.push(
//     await prisma.area.upsert({
//       where: {
//         title: 'Villa Ground'
//       },
//       update: {},
//       create: {
//         title: 'Villa Ground',
//         slug: 'villa-ground',

//       },
//     }),
//     await prisma.area.upsert({
//       where: {
//         title: 'Villa 1st Floor'
//       },
//       update: {},
//       create: {
//         title: 'Villa 1st Floor',
//         slug: 'villa-1st-floor',

//       },
//     }),
//     await prisma.area.upsert({
//       where: {
//         title: 'Villa 2nd Floor'
//       },
//       update: {},
//       create: {
//         title: 'Villa 2nd Floor',
//         slug: 'villa-2nd-floor',

//       },
//     }),
//     await prisma.area.upsert({
//       where: {
//         title: 'Colonica'
//       },
//       update: {},
//       create: {
//         title: 'Colonica',
//         slug: 'colonica',

//       },
//     }),
//     await prisma.area.upsert({
//       where: {
//         title: 'Other Rooms'
//       },
//       update: {},
//       create: {
//         title: 'Other Rooms',
//         slug: 'other-rooms',

//       },
//     })
//   )

//   const r = await Promise.all(promises)

  const itemPromises = [];

  for (const antique of data.antiques) {
    itemPromises.push(
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
    )
  }
  
  const response = await Promise.all(itemPromises)
  console.log(response)
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
