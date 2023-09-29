import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export const GET = async (req: NextRequest) => {
  const url = new URL(req.url as string)
  const searchParams = url.searchParams;
  try {
    switch (true) {
      case Boolean(searchParams.get('p')):
        const antiquesByItemNo = await prisma.antique.findMany({
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
        return NextResponse.json(antiquesByItemNo)
      case Boolean(searchParams.get('r')):
        const antiquesByRoomId = await prisma.antique.findMany({
          where: {
            roomId: {
              equals: searchParams.get('r') as string
            }
          },
        })
        return NextResponse.json(antiquesByRoomId)
      default:
        const antiquesByDescOrItemNo = await prisma.antique.findMany({
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
          },
          include: {
            area: {
              include: {
                categories: true,
              },
            },
            category: true,
            room: {
              include: {
                categories: true,
              },
            }
          },
        })
        return NextResponse.json(antiquesByDescOrItemNo)
    }
  } catch (error) {
    return NextResponse.json(error , { status: 500 })
  }
}
