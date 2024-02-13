const express=require("express");
const {Admin,User,Course}=require("../db/db");
// import { Admin,User,Course } from "../db/db";
const {adminJwtAuthenticate,adminSecret}=require("../middleware/auth.js");
const jwt=require("jsonwebtoken");

const router=express.Router();

function generateAdminJwt(payload){
    return jwt.sign(payload,adminSecret);
}
router.get("/me",adminJwtAuthenticate,(req,res)=>{
    console.log("came to admin/me.");
    res.status(201).json({'username':req.username});
});

router.post("/signup",async(req,res)=>{
    const adminExists=await Admin.findOne({username:req.body.username});
    console.log(adminExists);
    if(adminExists){
        res.status(403).json({msg:"Admin already exists!!"});
    }else{
        const admin=Admin(req.body);
        await admin.save();
        const token=generateAdminJwt(req.body.username);
        res.status(201).json({msg:"Admin created!!",token});
    }
});

router.post("/login",async(req,res)=>{
    const {username,password}=req.body;
    const adminExists=await Admin.findOne({username,password});
    if(adminExists){
        const token=generateAdminJwt(username);
        res.status(201).json({msg:"Admin login success",token});
    }else{
        res.status(403).json({msg:"Admin login failed!!"});
    }
});
let courseId=1;
router.post("/courses",adminJwtAuthenticate,async(req,res)=>{
    const course=Course({...req.body,courseId});
    courseId+=1;
    await course.save();
    res.status(201).json({msg:"Course added!!"});
});

router.get("/courses",adminJwtAuthenticate,async(req,res)=>{
    const courses=await Course.find({});
    res.status(201).json(courses);
});

router.get("/courses/:courseId",adminJwtAuthenticate,async(req,res)=>{
    const course=await Course.findById(req.params.courseId);
    res.status(201).json(course);
});

router.put("/courses/:courseId",adminJwtAuthenticate,async(req,res)=>{
    await Course.findByIdAndUpdate(req.params.courseId,req.body);
    res.status(201).json({msg:"Course updated!!"});
});

module.exports=router;