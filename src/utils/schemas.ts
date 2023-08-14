import Joi from 'joi';

const userSchema = Joi.object({
  name: Joi.string().min(3),
  price: Joi.string().min(3),
});

export default userSchema;
