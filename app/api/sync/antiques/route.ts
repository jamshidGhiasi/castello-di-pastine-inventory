import { NextRequest, NextResponse } from "next/server";
import { mapSeries } from 'bluebird'
import prisma from "@/lib/prisma";
import fetchAntiquesFromGoogleSheets from "@/utils/fetchAntiquesFromGoogleSheets"
import type { AntiqueFromGoogleSheets } from "@/types/Antique"
import { Area } from '@prisma/client'

/**
 * Helper function to check if a value is empty
 * most importantly for the value === 'NULL' case from Google Sheets
 * @param value
 */
const isEmpty = (value: string | undefined) => value === 'NULL' || value === undefined || value === null || value === ''

/**
 * Helper function to create an Area from an Antique
 * @param antique
 */
const createAreaFromAntique = async (antique: AntiqueFromGoogleSheets): Promise<Area | undefined> => {
  const areaCreateOptions = {
    data: {
      title: antique.area,
      slug: antique.areaId,
      categories: {
        connectOrCreate: {
          where: { slug: antique.categoryId },
          create: { title: antique.category, slug: antique.categoryId },
        },
      },
    }
  }
  try {
    // Handle degenerate case where areaId is 'NULL' (string null)
    if (isEmpty(antique.areaId)) return
    // Try to find the Area
    const onFindUnique = await prisma['area'].findUnique({ where: { slug: antique.areaId } })
    // Create if it doesn't exist
    if (!onFindUnique) return prisma.area.create(areaCreateOptions)
  } catch (error) {
    if (!antique.areaId) return
    // Create if we crash onFindUnique
    return prisma.area.create(areaCreateOptions);
  }
}

/**
 * Blackbox function to sync antiques from Google Sheets to Prisma
 * @param request
 * @constructor
 */
export const GET = async (request: NextRequest) => {
  try {
    const antiquesFromGoogleSheets = await fetchAntiquesFromGoogleSheets()

    // Delete all antiques from prisma then insert all antiques from Google Sheets
    await prisma.antique.deleteMany()
    await prisma.area.deleteMany()
    await prisma.category.deleteMany()
    await prisma.room.deleteMany()

    // Seed all antiques and relations from Google Sheets
    const onSeed = await mapSeries(antiquesFromGoogleSheets, async (antique: AntiqueFromGoogleSheets) => {
      /**
       * Ensure the Area Exists: Before creating the Room, make sure that the Area with the slug antique.areaId exists.
       * Given the nature of connectOrCreate, you might assume that the Area should have been created when the
       * Antique was being created, but race conditions can occur.
       */
      try {
        // 1. Ensure the Area exists or create it if not
        // Try to connect to the Area, or create it if it doesn't exist
        // Define create defaults
        await createAreaFromAntique(antique)

        // 2. Now create the Antique with assurance that the Area exists
        const onCreate = await prisma.antique.create({
          data: {
            /**
             * Properties
             */
            itemNo: antique.itemNo,
            description: antique.description,
            lot: antique.lot,
            height: antique.height,
            width: antique.width,
            depth: antique.depth,
            /**
             * Relations
             */
            // Connect or create relation for category
            category: {
              connectOrCreate: {
                where: { slug: antique.categoryId },
                create: { title: antique.category, slug: antique.categoryId }
              }
            },
            // Connect or create relation for area
            ...(!isEmpty(antique.areaId) && { area: { connect: { slug: antique.areaId } } }),
            // Connect or create relation for room
            ...(!isEmpty(antique.areaId) && !isEmpty(antique.roomId) && {
              room: {
                connectOrCreate: {
                  where: { slug: antique.roomId },
                  create: {
                    title: antique.room,
                    slug: antique.roomId,
                    roomNo: antique.room,
                    areaId: antique.areaId,
                    categories: {
                      connectOrCreate: {
                        where: { slug: antique.categoryId },
                        create: { title: antique.category, slug: antique.categoryId },
                      },
                    },
                  }
                }
              }
            }),
          },
          include: {
            area: true,
            category: true,
            room: true
          }
        })
        return onCreate
      } catch (err) {
        console.error('Error caught at onSeed:', { err, antique });
      }
    })

    return NextResponse.json(onSeed, { status: 200 })
  } catch (error) {
    console.error('Error caught at sync route:', error)
    return NextResponse.json({ message: "Error", error }, { status: 500 })
  }
}
