import * as Joi from 'joi';

export const validationSchema = Joi.object({
  MONGO_URI: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  ADMIN_EMAIL: Joi.string().required(),
  ADMIN_NAME: Joi.string().required(),
  ADMIN_PHONE: Joi.string().required(),
  ADMIN_PASSWORD: Joi.string().required(),
});
