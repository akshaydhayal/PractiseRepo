import { NextApiRequest,NextApiResponse } from "next";
import { verifyUser } from "@/lib/auth";
import { JwtPayload } from "jsonwebtoken";

const adminSecret="admin";
type Data={
    msg:string ;
    username?:string|JwtPayload;
}
export default function Handler(req:NextApiRequest,res:NextApiResponse<Data>){
    const token=req.headers.token;
    if(typeof(token)=="undefined" || Array.isArray(token) ){
        return res.status(403);
    }
    const username=verifyUser(token,adminSecret);
    if(username){
        res.status(201).json({msg:"auth sucess!!",username});
    }else{
        res.status(403).json({msg:"Auth failed"});
    }
}