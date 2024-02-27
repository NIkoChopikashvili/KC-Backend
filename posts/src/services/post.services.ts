import { Post } from "../db/models";

/**
 * Sign up
 * @param {number} otp_length - Length of otp.
 */
export const generateOTP = (otp_length: number) => {
  // Declare a digits variable which stores all digits
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < otp_length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return 1111;
};

export const createPost = async (
  title: string,
  userId: string,
  imageUrl: string,
  likeCount: number = 0,
  commentCount: number = 0
) => {
  return await Post.create({
    title,
    userId,
    imageUrl,
    likeCount,
    commentCount,
  });
};
