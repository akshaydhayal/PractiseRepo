const express=require("express");
const {User,Course}=require("../db/db.js");
const jwt=require("jsonwebtoken");
const {userJwtAuthenticate,userSecret}=require("../middleware/auth.js")
const {z} =require("zod");
const router=express.Router();

const userLoginType=z.object({
    username:z.string().min(1).max(50),
    password:z.string().max(20).min(1)
});

function generateUserJwt(payload){
    return jwt.sign(payload,userSecret);
}

router.post("/signup",async(req,res)=>{
    const parsedInput=userLoginType.safeParse(req.body);
    if(!parsedInput.success){
        return res.status(403).json({msg:parsedInput.error});
    }
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
    const parsedInput=userLoginType.safeParse(req.body);
    if(!parsedInput.success){
        return res.status(403).json({msg:parsedInput.error});
    }
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
    const parsedInput=userLoginType.safeParse(req.body);
    if(!parsedInput.success){
        return res.status(403).json({msg:parsedInput.error});
    }
    // if(typeof(req.body.username)!="string" || typeof(req.body.password)!="string"){
    //     return res.status(403).json({msg:"wrong user details type, enter string values"});
    // }
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