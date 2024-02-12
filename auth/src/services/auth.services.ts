import { getJWTToken } from "../utils/crypto";
import { User, UserSocial } from "../db/models";
import {
  OtpExpiredException,
  UserAlreadyExist,
  UserNotFound,
  WrongLoginInfoException,
  WrongOtpException,
} from "../exceptions";
import { Otp } from "../db/models";
// const client = require("twilio")(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );
import { normalizePhone } from "../utils/phone";
import moment from "moment";
import axios from "axios";

/**
 * Sign up
 * @param {number} otp_length - Length of otp.
 */
const generateOTP = (otp_length: number) => {
  // Declare a digits variable which stores all digits
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < otp_length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return 1111;
};

/**
 * Sign up
 * @param {string} phone - Phone number typed by user.
 */
export const registerUser = async (phone: string) => {
  const checkUser = await User.findOne({
    where: { phone: normalizePhone(phone), verified: true },
  });

  if (checkUser) throw new UserAlreadyExist("User already exits");

  const userObject: any = User.build({
    phone: normalizePhone(phone),
  });

  await userObject.validate();
  await userObject.save();

  const otp = generateOTP(4);

  const expirationAt = moment().add(10, "minutes").toDate();

  const userOtp: any = await Otp.create({
    phone: normalizePhone(phone),
    otp,
    expirationAt,
    userId: userObject.id,
  });

  return {
    id: userObject.id,
    phone: userObject.phone,
    otp,
    otpId: userOtp.id,
  };
};

/**
 * Sign in
 * @param {string} phone - Phone number typed by user.
 */
export const signInUser = async (phone: string) => {
  const checkUser = await User.findOne({
    where: { phone: normalizePhone(phone) },
  });
  if (!checkUser) throw new UserNotFound("User not found.");

  const otp = generateOTP(4);

  const expirationAt = moment().add(10, "minutes").toDate();

  const userOtp: any = await Otp.create({
    phone: normalizePhone(phone),
    otp,
    expirationAt,
    userId: checkUser.id,
  });

  return {
    id: checkUser.id,
    phone: checkUser.phone,
    otp,
    otpId: userOtp.id,
  };
};

/**
 * Get JWT token
 * @param {string} phone - Phone number typed by user.
 */
export const getTokenFromPhone = async (phone: string) => {
  const userObject: any = await User.findOne({ where: { phone } });
  if (!userObject) throw new WrongLoginInfoException("Phone invalid");

  return { token: getJWTToken({ id: userObject.id, phone: userObject.phone }) };
};

/**
 * Send sms
 * @param {Object} params - Sms params
 * @param {string} params.message - Message content.
 * @param {string|string[]} params.numbers - Receiver phone number.
 */
export const sendSMS = async (message: string, numbers: string | string[]) => {
  const toNumbers = Array.isArray(numbers) ? numbers : [numbers];
  // try {
  //   await Promise.all(
  //     toNumbers.map((number) =>
  //       client.messages.create({
  //         to: number,
  //         from: "KC",
  //         body: message,
  //       })
  //     )
  //   );
  // } catch (err) {
  //   console.log(err);
  // }
};

/**
 * Verify OTP
 * @param {string} otpId - OTP id.
 * @param {string} otp - OTP Typed by user.
 */
export const verifyOtp = async (otpId: string, otp: number) => {
  const userOtp: any = await Otp.findByPk(otpId);

  if (!userOtp) throw new WrongOtpException("Wrong OTP!");

  if (userOtp.otp != otp) throw new WrongOtpException("Wrong OTP!");

  if (new Date() > userOtp.expirationAt)
    throw new OtpExpiredException("Otp expired try again.");

  await User.update({ verified: true }, { where: { id: userOtp.userId } });

  Otp.destroy({ where: { id: otpId } });

  return await getTokenFromPhone(userOtp.phone);
};

/**
 * Get facebook users data
 * @param {string} access_token - Facebooks userId.
 */
export const getFacebookUserData = async (access_token: string) => {
  const { data } = await axios({
    url: "https://graph.facebook.com/me",
    method: "get",
    params: {
      fields: ["id", "email", "first_name", "last_name"].join(","),
      access_token: access_token,
    },
  });
  return data;
};

/**
 * Create Social User
 * @param {string} userId - User Id.
 * @param {string} email - Users email.
 * @param {string} socialId - Users socialId.
 */
export const createSocialUser = async (
  userId: string,
  email: string,
  socialId: String
) => {
  try {
    return await UserSocial.create({
      socialId,
      email,
      source: "facebook",
      userId,
    });
  } catch (err) {
    return err;
  }
};
