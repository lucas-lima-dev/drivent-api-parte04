import Joi from 'joi';

export const roomIdSchema = Joi.object({
  roomId: Joi.number().required(),
});

export const bookindIdSchema = Joi.object({
  bookingId: Joi.number().required(),
});
