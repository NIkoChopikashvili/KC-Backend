import { Request, Response, RequestHandler, NextFunction } from "express";
import {
  registerUser,
  sendSMS,
  verifyOtp,
  signInUser,
  getFacebookUserData,
  createSocialUser,
} from "../services";
import { resultCodes } from "../enums";
import { User } from "../db/models";

export const register: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { phone } = req.body;
  try {
    const { otp, otpId } = await registerUser(phone);

    await sendSMS(`Your verification code: ${otp}`, phone);

    return res.status(201).json({ result: resultCodes.SUCCESS, otpId });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const verifyCode: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { otp, otpId } = req.body;

  try {
    const token = await verifyOtp(otpId, otp);

    return res.status(200).json({ result: resultCodes.SUCCESS, token });
  } catch (err) {
    next(err);
  }
};

export const signIn: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { phone } = req.body;
  try {
    const { otp, otpId } = await signInUser(phone);

    await sendSMS(`Your verification code: ${otp}`, phone);

    return res.status(201).json({ result: resultCodes.SUCCESS, otpId });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const signUpFacebook: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { access_token } = req.body;

  try {
    const { id, email } = await getFacebookUserData(access_token);

    const userObject = await User.create({ phone: null });

    await createSocialUser(userObject.id, email, id);

    return res.status(201).json({ token: access_token });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
