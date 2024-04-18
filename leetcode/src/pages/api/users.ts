import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    let users = await User.find();
    res.status(201).json(users);
  }
  if (req.method === "POST") {
    let user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  }

}
