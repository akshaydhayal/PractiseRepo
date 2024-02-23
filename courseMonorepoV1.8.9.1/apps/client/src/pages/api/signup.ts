import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { Admin } from "db";
import { dbConnect } from "db";

const adminSecret = "admin";
type Data = {
  msg?: String;
  token?: String;
};

export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await dbConnect();
  console.log("inside Signup handlker fn");
  const { username, password } = req.body;
  console.log(`username : ${username } password : ${password}`);
  const adminExists = await Admin.findOne({ username });
  if (adminExists) {
    res.status(403).json({ msg: "Admin already exists!!" });
  } else {
    const admin=new Admin({username,password});
    await admin.save();
    const token = jwt.sign(username, adminSecret);
    res.status(201).json({ msg: "Admin created!!", token });
  }
}
