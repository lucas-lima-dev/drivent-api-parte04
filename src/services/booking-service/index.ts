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

  if (!ticket || ticket.status === 'RESERVED' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw forbiddenError();
  }

  const room = await bookingRepository.getRoomCapacity(roomId);
  if (!room) throw notFoundError();

  const bookings = await bookingRepository.getBookingByRoomId(roomId);

  if (room.capacity <= bookings.length) {
    throw forbiddenError();
  }
}

async function getBookingByUserId(userId: number) {
  const booking = await bookingRepository.getBookingByUserId(userId);
  if (!booking || booking.Room === null) throw notFoundError();
  return booking;
}

async function createBooking(userId: number, roomId: number) {
  await verifyBeforeCreateORChangeABooking(userId, roomId);

  const bookingCreated = await bookingRepository.createBooking(userId, roomId);

  return bookingCreated;
}

async function changeABooking(userId: number, roomId: number, bookingId: number) {
  await verifyBeforeCreateORChangeABooking(userId, roomId);

  const booking = await bookingRepository.getUserBooking(userId, bookingId);
  if (!booking) throw forbiddenError();

  const bookingChanged = await bookingRepository.changeABooking(userId, roomId, bookingId);

  return bookingChanged;
}
export default { getBookingByUserId, createBooking, changeABooking };
