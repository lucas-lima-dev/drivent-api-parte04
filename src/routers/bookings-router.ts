import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { createBooking, getBookingByUserId } from '@/controllers';
import { bookingSchema } from '@/schemas/booking-schema';

const bookingRouter = Router();

bookingRouter
  .all('/*', authenticateToken)
  .get('/', getBookingByUserId)
  .post('/', validateBody(bookingSchema), createBooking);

export { bookingRouter };
