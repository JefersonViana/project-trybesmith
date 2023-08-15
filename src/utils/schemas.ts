import Joi from 'joi';

const userSchema = Joi.object({
  name: Joi.string().min(3),
  price: Joi.string().min(3),
});

const productSchema = Joi.array().items(Joi.number()).label('productIds');

export {
  userSchema,
  productSchema,
};