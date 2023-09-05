import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async (request: NextRequest) => {
    try {
        const categories = await prisma.category.findMany({
           
            include: {
                antiques: true,
                _count: {
                    select: {
                        antiques: true
                    }
                }
            },
            

        })
        if (!categories.length) {
            return NextResponse.json({ message: "No categories found in DB" }, { status: 404 })
        }
        return NextResponse.json(categories, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Error Getting Categories", error }, { status: 500 })
    }
}