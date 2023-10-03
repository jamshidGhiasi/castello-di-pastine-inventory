import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export const GET = async (req: NextRequest) => {
    const url = new URL(req.url as string)
    const searchParams = url.searchParams;
    let range = searchParams.get('r');
    console.log(range);
    if (!range) return NextResponse.json({ message: 'Range Not Valid!'}, { status: 500 });
    let temp = []
    range = range.replace(/ /g, '');
    temp = range.split(',');
    temp = temp.map((item) => {
        if (item.indexOf('-') !== -1) {
            let range = item.split('-');
            let start = parseInt(range[0]);
            let end = parseInt(range[1]);
            let result = [];
            for (let i = start; i <= end; i++) {
                result.push(i.toString().padStart(4, '0'));
            }
            return result;
        } else {
            return item.padStart(4, '0');
        }
    })
    let set = new Set(temp.flat());
    temp = Array.from(set);

  

    try {

        const antiques = await prisma.antique.findMany({
            where: {
                itemNo: {
                    in: temp
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

    } catch (error) {
        return NextResponse.json(error, { status: 500 })
    }
}
