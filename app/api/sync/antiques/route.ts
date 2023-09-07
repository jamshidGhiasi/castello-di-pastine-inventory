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
    const onDelete = await Promise.all([
      prisma.antique.deleteMany(),
      prisma.area.deleteMany(),
      prisma.category.deleteMany(),
      prisma.room.deleteMany(),
    ])

    // Seed all antiques and relations from Google Sheets
    const onSeed = await mapSeries(antiquesFromGoogleSheets, async (antique: AntiqueFromGoogleSheets) => {
      try {
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
              connectOrCreate: {
                where: {
                  slug: antique.areaId
                },
                create: {
                  title: antique.area,
                  slug: antique.areaId
                }
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
