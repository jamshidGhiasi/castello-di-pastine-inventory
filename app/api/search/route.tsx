import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async (req: NextApiRequest) => {
    const url = new URL(req.url as string)
    const searchParams = url.searchParams;
    console.log(typeof searchParams)
    try {
        const antiques = await prisma.antique.findMany({
            where: {
                OR: [
                    {
                        description: {
                            contains: url.searchParams.get('q') as string,
                            mode: 'insensitive'
                        },

                    },
                    {
                        itemNo: {
                            contains: url.searchParams.get('q') as string,
                            mode: 'insensitive'
                        },

                    },
                ]
            }
        })
       
        return NextResponse.json(antiques)
    } catch (error) {
       
        return NextResponse.json( error , { status: 500})
    }
    
     
}
