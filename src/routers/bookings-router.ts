import { Router } from 'express';
import { authenticateToken, validateBody, validateParams } from '@/middlewares';
import { changeABooking, createBooking, getBookingByUserId } from '@/controllers';
import { bookindIdSchema, roomIdSchema } from '@/schemas/booking-schema';

const bookingRouter = Router();

bookingRouter
  .all('/*', authenticateToken)
  .get('/', getBookingByUserId)
  .post('/', validateBody(roomIdSchema), createBooking)
  .put('/:bookingId', validateParams(bookindIdSchema), validateBody(roomIdSchema), changeABooking);

export { bookingRouter };
