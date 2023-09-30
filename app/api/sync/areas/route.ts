import { NextRequest, NextResponse } from "next/server";
import { mapSeries } from 'bluebird'
import prisma from "@/lib/prisma";
import fetchAreasFromGoogleSheets from "@/utils/fetchAreasFromGoogleSheets"
import { AreaFromGoogleSheets } from "@/types/Area"

/**
 * Blackbox function to sync areas from Google Sheets to Prisma
 * @param request
 * @constructor
 */
export const GET = async (request: NextRequest) => {
  try {
    const areasFromGoogleSheets = await fetchAreasFromGoogleSheets()

    // Delete all areas from prisma then insert all areas from Google Sheets
    await prisma.area.deleteMany()

    // Seed all areas and relations from Google Sheets
    const onSeed = await mapSeries(areasFromGoogleSheets, async (area: AreaFromGoogleSheets) => {
      try {
        const onCreate = await prisma.area.create({
          data: {
            /**
             * Properties
             */
            order: Number(area.order),
            title: area.title,
            slug: area.slug,
          },
        })
        return onCreate
      } catch (err) {
        console.error('Error caught at area.onSeed:', { err, area });
      }
    })

    return NextResponse.json(onSeed, { status: 200 })
  } catch (error) {
    console.error('Error caught at sync route:', error)
    return NextResponse.json({ message: "Error", error }, { status: 500 })
  }
}

