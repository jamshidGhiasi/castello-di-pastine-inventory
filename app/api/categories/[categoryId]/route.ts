import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async (request: NextRequest, { params} : { params: { categoryId: string}}) => {
    try {
        const antiques = await prisma.antique.findMany({
           
            where: {
                categoryId: params.categoryId
            }
        })
        if (!antiques.length) {
            return NextResponse.json({ message: "No antiques within that category found in DB" }, { status: 404 })
        }
        return NextResponse.json(antiques, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Error Getting Antiques for category", error }, { status: 500 })
    }
}