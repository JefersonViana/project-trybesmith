import { NextFunction, Request, Response } from 'express';
import check from '../utils/checkRequiredField';
import { productSchema } from '../utils/schemas';

export default async function checkFields(req: Request, res: Response, next: NextFunction) {
  const checkField = check.checkRequiredField(req.body, ['productIds', 'userId']);
  if (checkField) {
    return res.status(400).json({ message: checkField });
  }
  const { userId, productIds } = req.body;
  if (typeof userId !== 'number') {
    return res.status(422).json({ message: '"userId" must be a number' });
  }
  const { error } = productSchema.validate(productIds);
  if (error) {
    return res.status(422).json({ message: error.message });
  }
  const notNumber = productIds.some((number: unknown) => typeof number !== 'number');
  const validations = [notNumber, productIds.length === 0];
  if (validations.some((element) => element === true)) {
    return res.status(422).json({ message: '"productIds" must include only numbers' });
  }
  return next();
}
