const express=require("express");
const {User,Course}=require("../db/db.js");
const jwt=require("jsonwebtoken");
const {userJwtAuthenticate,userSecret}=require("../middleware/auth.js")

const router=express.Router();

function generateUserJwt(payload){
    return jwt.sign(payload,userSecret);
}

router.post("/signup",async(req,res)=>{
    const userExists=await User.findOne({username:req.body.username});
    if(userExists){
        res.status(403).json({msg:"User already exist!!"});
    }else{
        const user=User(req.body);
        await user.save();
        const token=generateUserJwt(req.body.username);
        res.status(201).json({msg:"User created!!",token});
    }
});

router.post("/login",async(req,res)=>{
    const {username,password}=req.body;
    const userExists=await User.findOne({username,password});
    if(userExists){
        const token=generateUserJwt(username);
        res.status(201).json({msg:"User login success!!",token});
    }else{
        res.status(403).json({msg:"User login failed!!"});
    }
});

router.get("/courses",userJwtAuthenticate,async(req,res)=>{
    const courses=await Course.find({});
    res.status(201).json(courses);
});

router.post("/courses/:courseId",userJwtAuthenticate,async(req,res)=>{
    const user=await User.findOne({username:req.body.username,password:req.body.password});
    const course=await Course.findById(req.params.courseId);
    user.purchasedCourses.push(course);
    await user.save();
    console.log(user);
    res.status(201).json({msg:"Course purchased!!"});
});

router.get("/",userJwtAuthenticate,async(req,res)=>{
    const users=await User.find({}).populate("purchasedCourses");
    res.status(201).json(users);
})
module.exports=router;