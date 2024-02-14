import express from "express";

import jwt from "jsonwebtoken";

export const userSecret="user";
export const userAuth=async(req,res,next)=>{
    const token=req.headers.token;
    const decoded=await jwt.verify(token,userSecret);
    console.log("decoded: "+JSON.stringify(decoded));
    if(decoded){
        req.userId=decoded.id;
        next();
    }else{
        res.status(403).json({msg:"Usera uth failed!!"});
    }
}