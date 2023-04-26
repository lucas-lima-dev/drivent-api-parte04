import { notFoundError } from '@/errors';
import bookingRepository from '@/repositories/bookings-repository';

async function getBookingByUserId(userId: number) {
  const booking = await bookingRepository.getBookingByUserId(userId);
  if (!booking || booking.Room === null) throw notFoundError;
  return booking;
}

export default { getBookingByUserId };
