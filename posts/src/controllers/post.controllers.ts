import { Request, Response, RequestHandler, NextFunction } from "express";

export const createPost: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { post } = req.body;
  try {
  } catch (err) {
    console.log(err);
    next(err);
  }
};
