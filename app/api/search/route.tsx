import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async (req: NextApiRequest) => {
    const url = new URL(req.url as string)
    const searchParams = url.searchParams;
    console.log(typeof searchParams)
    try {
        if (searchParams.get('p')) {
            console.log(searchParams.get('p')?.split(',') as string[])
            const antiques = await prisma.antique.findMany({
                where: {
                    itemNo: {
                        in: searchParams.get('p')?.split(',') as string[]
                    }
                },
                include: {
                    room: {
                        select: {
                            title: true
                        }
                    },
                    area: {
                        select: {
                            title: true
                        }
                    },
                    category: {
                        select: {
                            title: true
                        }
                    },
                }
                
                
            })
            return NextResponse.json(antiques)
        }
            else if (searchParams.get('r')) {
                console.log(searchParams.get('p')?.split(',') as string[])
                const antiques = await prisma.antique.findMany({
                    where: {
                        roomId: {
                            equals: searchParams.get('r') as string
                        }
                    },
                    
                    
                    
                })
                return NextResponse.json(antiques)


        } else {
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
        }

       
       
    } catch (error) {
       
        return NextResponse.json( error , { status: 500})
    }
    
     
}
