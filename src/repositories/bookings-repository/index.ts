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

export default { getBookingByUserId };
