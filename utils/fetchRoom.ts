import prisma from "@/lib/prisma";

const fetchRoom = async (roomSlug: string) => {
  try {
    const room = await prisma.room.findUnique({
      where: {
        slug: roomSlug
      },
    });
    return room
  } catch (error) {
    console.error('Error caught at fetchRoom:', error);
    return null;
  }
}

export default fetchRoom;
