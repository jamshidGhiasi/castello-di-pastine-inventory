import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export const GET = async (req: NextRequest, { params }: { params: { roomId: string}}) => {
        console.log(params.roomId);
    try {

        const antiques = await prisma.antique.findMany({

            where: {
               room: {
                    slug: params.roomId
                }
            },
        })
        // console.log(antiques);
        return NextResponse.json(antiques)

    } catch (error) {
        return NextResponse.json(error, { status: 500 })
    }
}
