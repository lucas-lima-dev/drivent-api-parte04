import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getBookingByUserId } from '@/controllers';

const bookingRouter = Router();

bookingRouter.all('/*', authenticateToken).get('/', getBookingByUserId);

export { bookingRouter };
