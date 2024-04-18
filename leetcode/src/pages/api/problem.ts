import { NextApiRequest, NextApiResponse } from "next";
import { Problem } from "@/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    console.log(req.headers);
    console.log(req.headers.problem_id);
    let problem = await Problem.findOne({ _id: req.headers.problem_id });
    res.status(201).json(problem);
  }
}
