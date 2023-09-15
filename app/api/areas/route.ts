import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async (request: NextRequest) => {
    console.log('[DEBUG on Prod API]: Init')
    try {
        const areas = await prisma.area.findMany({
            orderBy: {
                order: 'asc'
            },
            include: {
                _count: {
                    select: { antiques: true },
                },


                categories: true

            },

        })
        if (!areas.length) {
          console.log('[DEBUG on Prod API]: areas not found')
            return NextResponse.json({ message: "No areas found in DB" }, { status: 404 })
        }
      console.log('[DEBUG on Prod API]: areas', areas)
        return NextResponse.json(areas, { status: 200 })
    } catch (error) {
      console.log('[DEBUG on Prod API]: err', error)
        return NextResponse.json({ message: "Error Getting Areas", error }, { status: 500 })
    }
}
