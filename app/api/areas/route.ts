import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async (request: NextRequest) => {
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
            return NextResponse.json({ message: "No areas found in DB" }, { status: 404 })
        }
        return NextResponse.json(areas, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Error Getting Areas", error }, { status: 500 })
    }
}