import { prisma } from '@/config';

async function getBookingByUserId(userId: number) {
  return prisma.booking.findFirst({
    where: { userId: userId },
    select: {
      id: true,
      Room: true,
    },
  });
}

async function getRoomCapacity(roomId: number) {
  return prisma.room.findFirst({
    where: { id: roomId },
    select: { capacity: true },
  });
}

async function getBookingByRoomId(roomId: number) {
  return prisma.booking.findMany({
    where: { Room: { id: roomId } },
  });
}

async function createBooking(userId: number, roomId: number) {
  return prisma.booking.create({
    data: { userId, roomId },
  });
}

export default { getBookingByUserId, createBooking, getRoomCapacity, getBookingByRoomId };
