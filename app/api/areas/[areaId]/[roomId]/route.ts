import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async (request: NextRequest, { params }: { params: { areaId: string, roomId: string }}) => {
    try {
        console.log(params)
        const area = await prisma.antique.findMany({
            where: {
                AND: [
                    {
                        roomId: {
                            equals: params.roomId
                        }
                    },
                    {
                        areaId: {
                            equals: params.areaId
                        }
                    },
                ]
            },         
            
        })
        if (!area) {
            return NextResponse.json({ message: "No area found in DB" }, { status: 404 })    
        }
        return NextResponse.json(area, { status: 200})
    } catch (error) {
        return NextResponse.json({ message: "Error Getting Areas", error }, { status: 500 })
    }
}