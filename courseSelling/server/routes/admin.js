const express = require("express");
const { Admin, User, Course } = require("../db/db");
// import { Admin,User,Course } from "../db/db";
const { adminJwtAuthenticate, adminSecret } = require("../middleware/auth.js");
const jwt = require("jsonwebtoken");
const z = require("zod");
// const {loginInput}=require("../../../common/dist/index.js");
const {loginInput}=require("@akshaydhayal/common2");


const router = express.Router();

const signupInput = z.object({
  username: z.string().min(1).max(50),
  password: z.string().min(1).max(20),
});
const courseInput = z.object({
  title: z.string().max(50),
  description: z.string(),
  price: z.number().nonnegative(),
  published:z.boolean(),
  imageLink:z.string()
});

function generateAdminJwt(payload) {
  return jwt.sign(payload, adminSecret);
}
router.get("/me", adminJwtAuthenticate, (req, res) => {
  console.log("came to admin/me..");
  res.status(201).json({ username: req.username });
});

router.post("/signup", async (req, res) => {
//   const parsedSignupInput = signupInput.safeParse(req.body);
  const parsedSignupInput = loginInput.safeParse(req.body);
  if (!parsedSignupInput.success) {
    return res.status(403).json({ msg: parsedSignupInput.error });
  }

  const adminExists = await Admin.findOne({ username: req.body.username });
  console.log(adminExists);
  if (adminExists) {
    res.status(403).json({ msg: "Admin already exists!!" });
  } else {
    const admin = Admin(req.body);
    await admin.save();
    const token = generateAdminJwt(req.body.username);
    res.status(201).json({ msg: "Admin created!!", token });
  }
});

router.post("/login", async (req, res) => {
  const parsedinput = signupInput.safeParse(req.body);
  if (!parsedinput.success) {
    return res.status(403).json({ msg: parsedinput.error });
  }
  const { username, password } = req.body;
  const adminExists = await Admin.findOne({ username, password });
  if (adminExists) {
    const token = generateAdminJwt(username);
    res.status(201).json({ msg: "Admin login success", token });
  } else {
    res.status(403).json({ msg: "Admin login failed!!" });
  }
});


let courseId = 1;
router.post("/courses", adminJwtAuthenticate, async (req, res) => {
  const parsedInput=courseInput.safeParse(req.body);
  if(!parsedInput.success){
    return res.status(403).json({msg:parsedInput.error});
  }
  const course = Course({ ...req.body, courseId });
  courseId += 1;
  await course.save();
  res.status(201).json({ msg: "Course added!!" });
});

router.get("/courses", adminJwtAuthenticate, async (req, res) => {
  const courses = await Course.find({});
  res.status(201).json(courses);
});

router.get("/courses/:courseId", adminJwtAuthenticate, async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  res.status(201).json(course);
});

router.put("/courses/:courseId", adminJwtAuthenticate, async (req, res) => {
  const parsedinput=courseInput.safeParse(req.body);
  if(!parsedinput.success){
    return res.status(403).json({msg:parsedinput.error});
  }
  const updatedCourse = await Course.findByIdAndUpdate(
    req.params.courseId,
    req.body,
    { returnDocument: "after" }
  );
  res.status(201).json({ msg: "Course updated!!", updatedCourse });
});

module.exports = router;
