import { forbiddenError, notFoundError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';
import bookingRepository from '@/repositories/bookings-repository';

async function verifyBeforeCreateORChangeABooking(userId: number, roomId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  console.log(ticket.status);

  if (!ticket || ticket.status === 'RESERVED' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw forbiddenError();
  }
  const room = await bookingRepository.getRoomCapacity(roomId);

  const bookings = await bookingRepository.getBookingByRoomId(roomId);

  if (room.capacity === bookings.length) throw forbiddenError();
}

async function getBookingByUserId(userId: number) {
  const booking = await bookingRepository.getBookingByUserId(userId);
  if (!booking || booking.Room === null) throw notFoundError();
  return booking;
}

async function createBooking(userId: number, roomId: number) {
  await verifyBeforeCreateORChangeABooking(userId, roomId);

  const bookingCreated = await bookingRepository.createBooking(userId, roomId);

  return bookingCreated.id;
}

export default { getBookingByUserId, createBooking };
