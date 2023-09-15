import { NextRequest, NextResponse } from "next/server";
import { mapSeries } from 'bluebird'
import prisma from "@/lib/prisma";
import fetchAntiquesFromGoogleSheets from "@/utils/fetchAntiquesFromGoogleSheets";
import type { AntiqueFromGoogleSheets } from "@/types/Antique"

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
        try {
          const onFindUnique = await prisma.area.findUnique({
            where: {
              slug: antique.areaId
            }
          });

          // Create if it doesn't exist
          if (!onFindUnique) {
            await prisma.area.create({
              data: {
                title: antique.area,
                slug: antique.areaId
              }
            } as any)
          }
        } catch (error) {
          if (!antique.areaId) return

          // Create if we crash
          await prisma.area.create({
            data: {
              title: antique.area,
              slug: antique.areaId
            } as any
          });
        }

        // 2. Now create the Antique with assurance that the Area exists
        const onCreate = await prisma.antique.create({
          data: {
            // Properties
            itemNo: antique.itemNo,
            description: antique.description,
            lot: antique.lot,
            height: antique.height,
            width: antique.width,
            depth: antique.depth,
            // Relations
            area: {
              connect: {
                slug: antique.areaId
              }
            },
            // Connect or create relation for category
            category: {
              connectOrCreate: {
                where: {
                  slug: antique.categoryId
                },
                create: {
                  title: antique.category,
                  slug: antique.categoryId
                }
              }
            },
            // Connect or create relation for room
            room: {
              connectOrCreate: {
                where: {
                  slug: antique.roomId
                },
                create: {
                  title: antique.room,
                  slug: antique.roomId,
                  roomNo: antique.room,
                  areaId: antique.areaId,
                }
              }
            }
          },
          include: {
            area: true,
            category: true,
            room: true
          }
        } as any);
        return onCreate
      } catch (err) {
        console.error('Error caught:', { err, antique });
      }
    })

    return NextResponse.json(onSeed, { status: 200 })
  } catch (error) {
    console.error('Error', error)
    return NextResponse.json({ message: "Error", error }, { status: 500 })
  }
}
