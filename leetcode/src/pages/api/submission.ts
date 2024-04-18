import { NextApiResponse,NextApiRequest } from "next";
import {Submission} from "@/db";

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method==='GET'){
        let submissions=await Submission.find().populate("user").populate("problem");
        res.status(201).json(submissions);
    }
    if(req.method==='POST'){
        let submission=new Submission(req.body);
        await submission.save();
        res.status(201).json({msg:"Submission added",submission});
    }
}