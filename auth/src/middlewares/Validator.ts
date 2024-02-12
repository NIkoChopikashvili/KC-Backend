//* Include joi to check error type
import Joi from "joi";
import { Request, Response, NextFunction } from "express";

/**
 *
 * @param {import("joi").ObjectSchema} validator
 */
export function Validator(validator: Joi.ObjectSchema) {
  //! If validator does not exist, throw err
  if (!validator) throw new Error(`validator does not exist`);

  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { body, query } = req;
      const target = { body: {}, query: {} };
      if (!isEmpty(body)) target.body = body;
      if (!isEmpty(query)) target.query = query;

      const validated = await validator.validateAsync(target);
      req.body = validated.body || {};
      req.query = validated.query || {};
      next();
    } catch (err) {
      return next();
    }
  };
}

function isEmpty(obj: any) {
  return Array.from(Object.keys(obj)).length === 0;
}
