import {NextApiRequest,NextApiResponse} from "next";
import { Admin } from "db";
import jwt from "jsonwebtoken";

const adminSecret="admin";
type Data={
    msg:string;
    token?:string;
}
export default async function Handler(req:NextApiRequest,res:NextApiResponse<Data>){
    const {username,password}=req.body;
    const adminExists=await Admin.findOne({username,password});
    if(adminExists){
        const token=jwt.sign(username,adminSecret);
        res.status(201).json({msg:"User login sucess",token});
    }else{
        res.status(403).json({msg:"User login failed!!, don't exists"});
    }
}