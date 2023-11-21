import {NextRequest, NextResponse} from "next/server";
import {mapSeries} from 'bluebird'
import prisma from "@/lib/prisma";
import fetchRoomsFromGoogleSheets from "@/utils/fetchRoomsFromGoogleSheets"
import {RoomFromGoogleSheets} from "@/types/Room"
import {Room} from "@prisma/client";

export const maxDuration = 300

const getRoomDatabaseProperties = (room: RoomFromGoogleSheets) => ({
  order: Number(room.order),
  title: room.title,
  slug: room.slug,
  roomNo: room.roomId,
  areaId: room.areaId,
  moodBoard: room.moodBoard,
})

/**
 * Blackbox function to sync rooms from Google Sheets to Prisma
 * @param request
 * @constructor
 */
export const GET = async (request: NextRequest) => {
  try {
    const roomsFromGoogleSheets = await fetchRoomsFromGoogleSheets()

    // Seed all rooms and relations from Google Sheets
    const onSeed = await mapSeries(roomsFromGoogleSheets, async (room: RoomFromGoogleSheets) => {
      try {
        const upsertRoom = await prisma.room.upsert({
          where: { slug: room.slug },
          update: {
            order:Number(room.order),
            moodBoard: room.moodBoard,
          },
          create: getRoomDatabaseProperties(room),
        });
        return upsertRoom;
      } catch (err) {
        console.error('Error caught at room.onSeed:', { err, room });
      }
    })

    return NextResponse.json(onSeed, { status: 200 })
  } catch (error) {
    console.error('Error caught at sync route:', error)
    return NextResponse.json({ message: "Error", error }, { status: 500 })
  }
}

export const POST = async (request: NextRequest) => {
  try {
    const { selectedItems = [] } = await request.json()
    if (!selectedItems.length) return NextResponse.json({ message: "No items selected" }, { status: 200 })
    const selectedSlugs = selectedItems.map(({ slug }: Room) => slug)
    const roomsFromGoogleSheets = await fetchRoomsFromGoogleSheets()
    const selectedRoomsFromGoogleSheets = roomsFromGoogleSheets.filter((room: RoomFromGoogleSheets) => selectedSlugs.includes(room.slug))

    // Seed all rooms and relations from Google Sheets
    const onSeed = await mapSeries(selectedRoomsFromGoogleSheets, async (room: RoomFromGoogleSheets) => {
      try {
        const upsertRoom = await prisma.room.upsert({
          where: { slug: room.slug },
          update: getRoomDatabaseProperties(room),
          create: getRoomDatabaseProperties(room),
        });
        return upsertRoom;
      } catch (err) {
        console.error('Error caught at room.onSeed:', { err, room });
      }
    })

    return NextResponse.json(onSeed, { status: 200 })
  } catch (error) {
    console.error('Error caught at sync route:', error)
    return NextResponse.json({ message: "Error", error }, { status: 500 })
  }
}
