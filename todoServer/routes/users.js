import express from "express";
import { Todo, User } from "../db/models.js";
import jwt from "jsonwebtoken";
import { userAuth, userSecret } from "../middlewares/auth.js";
import bodyParser from "body-parser";

export const router=express.Router();
router.use(bodyParser.json());

function generateJwtToken(payload){
    return jwt.sign(payload,userSecret);
}
router.post("/signup",async(req,res)=>{
    const {username,password}=req.body;
    const userExists=await User.findOne({username});
    if(userExists){
        const token=generateJwtToken({id:userExists._id});
        res.status(403).json({msg:"User already exists!!",token});
    }else{
        const user=User(req.body);
        await user.save();
        const token=generateJwtToken({id:user._id});
        res.status(201).json({msg:"User created!!",token});
    }
});

router.post("/login",async(req,res)=>{
    const {username,password}=req.body;
    const userExists=await User.findOne({username,password});
    if(userExists){
        const token=generateJwtToken({id:userExists._id});
        res.status(201).json({msg:'Login success!!',token});
    }else{
        res.status(403).json({msg:"User login failed!!"});
    }
})

router.get("/me",userAuth,async(req,res)=>{
    const user=await User.findById(req.userId);
    if(user){
        res.status(201).json({username:user.username});
    }else{
        res.status(403).json({msg:"User not logged in!!"});
    }
})