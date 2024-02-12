// @flow
import jwt from "jsonwebtoken";

export const jwtSalt: any = process.env?.JWT_SALT;

export function getJWTToken(payload: any) {
  return jwt.sign(payload, jwtSalt, { expiresIn: "3y" });
}
