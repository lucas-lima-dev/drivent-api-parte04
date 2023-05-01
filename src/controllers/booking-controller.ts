import { Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import bookingsService from '@/services/booking-service';

export async function getBookingByUserId(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;

  try {
    const booking = await bookingsService.getBookingByUserId(Number(userId));
    return res.status(httpStatus.OK).send(booking);
  } catch (error) {
    next(error);
  }
}

export async function createBooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  const { roomId } = req.body;

  try {
    const { id } = await bookingsService.createBooking(Number(userId), Number(roomId));
    return res.status(httpStatus.OK).send({ bookingId: id });
  } catch (error) {
    next(error);
  }
}

export async function changeABooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { bookingId } = req.params;
  const { userId } = req;
  const { roomId } = req.body;

  try {
    const { id } = await bookingsService.changeABooking(Number(userId), Number(roomId), Number(bookingId));
    return res.status(httpStatus.OK).send({ bookingId: id });
  } catch (error) {
    next(error);
  }
}
