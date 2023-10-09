import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export const GET = async (req: NextRequest) => {
    try {

        const rooms = await prisma.room.findMany({
          include: {
            antiques: true
          }
        })
        // console.log(rooms);
        return NextResponse.json(rooms)

    } catch (error) {
        return NextResponse.json(error, { status: 500 })
    }
}
