import { NextRequest, NextResponse } from "next/server";
import { mapSeries } from 'bluebird'
import prisma from "@/lib/prisma";
import fetchAreasFromGoogleSheets from "@/utils/fetchAreasFromGoogleSheets"
import { AreaFromGoogleSheets } from "@/types/Area"
import {Area} from "@prisma/client";

export const maxDuration = 300

const getAreaDatabaseProperties = (area: AreaFromGoogleSheets) => ({
  order: area.order,
  title: area.title,
  slug: area.slug,
})

/**
 * Blackbox function to sync areas from Google Sheets to Prisma
 * @param request
 * @constructor
 */
export const GET = async (request: NextRequest) => {
  try {
    const areasFromGoogleSheets = await fetchAreasFromGoogleSheets()

    // Seed all areas and relations from Google Sheets
    const onSeed = await mapSeries(areasFromGoogleSheets, async (area: AreaFromGoogleSheets) => {
      try {
        const upsertArea = await prisma.area.upsert({
          where: { slug: area.slug },
          update: {
            order: area.order,
          },
          create: getAreaDatabaseProperties(area),
        })
        return upsertArea;
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

export const POST = async (request: NextRequest) => {
  try {
    const { selectedItems = [] } = await request.json()
    if (!selectedItems.length) return NextResponse.json({ message: "No items selected" }, { status: 200 })
    const selectedSlugs = selectedItems.map(({ slug }: Area) => slug)
    const areasFromGoogleSheets = await fetchAreasFromGoogleSheets()
    const selectedAreasFromGoogleSheets = areasFromGoogleSheets.filter((area: AreaFromGoogleSheets) => selectedSlugs.includes(area.slug))

    // Seed all areas and relations from Google Sheets
    const onSeed = await mapSeries(selectedAreasFromGoogleSheets, async (area: AreaFromGoogleSheets) => {
      try {
        const upsertArea = await prisma.area.upsert({
          where: { slug: area.slug },
          update: getAreaDatabaseProperties(area),
          create: getAreaDatabaseProperties(area),
        })
        return upsertArea
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
