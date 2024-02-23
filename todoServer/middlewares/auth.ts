import express from "express";

import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
export const userSecret = "user";
export const userAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.token) {
    return res.status(403);
  }
  const token = req.headers.token;
  const decoded = await jwt.verify(token as string, userSecret);
  console.log("decoded: " + JSON.stringify(decoded));
  if (decoded && typeof(decoded)!="string") {
    req.headers.userId = decoded.id; //trick to store id in headers, ts will not complain this
    // req.userId=decoded.id;
    next();
  } else {
    res.status(403).json({ msg: "Usera uth failed!!" });
  }
};
