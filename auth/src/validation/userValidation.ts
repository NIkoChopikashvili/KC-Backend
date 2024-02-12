import Joi from "joi";

export const userSignupValidation = Joi.object({
  body: {
    phone: Joi.string().required(),
  },
});

export const userSigninValidation = Joi.object({
  body: {
    phone: Joi.string().required(),
  },
});
