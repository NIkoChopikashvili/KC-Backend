import express, { Request, Response, NextFunction } from "express";
import { getUserById } from "../services";
import { resultCodes } from "../enums";
import { authHandler, Validator } from "../middlewares";
import { register, signIn, verifyCode } from "../controllers/auth.controller";
import { userSigninValidation, userSignupValidation } from "../validation";

const authRoute = express.Router();

authRoute.get(
  "/check-token",
  authHandler,
  function (req: Request, res: Response) {
    res.setHeader("User-Id", req.user.id);
    res.sendStatus(200);
  }
);

authRoute.get(
  "/me",
  authHandler,
  function (req: Request, res: Response, next: NextFunction) {
    getUserById(req.user.id)
      .then((user) => res.json({ result: resultCodes.SUCCESS, user }))
      .catch(next);
  }
);

authRoute.post("/register", Validator(userSignupValidation), register);

authRoute.post("/login", Validator(userSigninValidation), signIn);

authRoute.post("/verifyOtp", verifyCode);

export { authRoute };
