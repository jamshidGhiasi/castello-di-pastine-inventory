import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async (req: NextApiRequest) => {
    const url = new URL(req.url as string)
    console.log(url.searchParams.get('q'))
    try {
        const antiques = await prisma.antique.findMany({
            where: {
                description: {
                    contains: url.searchParams.get('q') as string,
                    mode: 'insensitive'
                }
            }
        })
        console.log(antiques)
        return NextResponse.json(antiques)
    } catch (error) {
        console.log(error)
        return NextResponse.error()
    }
    
     
}
