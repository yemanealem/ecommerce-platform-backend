import { Request, Response, NextFunction } from "express";
import { ApiError } from "../../../utils/ApiError";
import { ResponseFormatter } from "../../../utils/BasicResponseFormatter";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  if (err instanceof ApiError) {
    console.log("eeeeeeeeeeeeeeee",err)
    return res
      .status(err.statusCode)
      .json(ResponseFormatter.error(err.message, err.errors)); 
  }

  res.status(500).json(ResponseFormatter.error("Internal Server Error", null));
};
