import {NextApiResponse,NextApiRequest} from "next";
import { Problem } from "@/db";
import mongoose from "mongoose";
import { dbConnect } from "@/utils/dbConnect";

export default async function handler(
    req:NextApiRequest,
    res:NextApiResponse
){
  dbConnect();
  if(req.method==='GET'){
    let problems=await Problem.find().populate("last_user_solved");
    console.log("problems in problem api route"+problems);
    res.status(201).json(problems);
  }
  if(req.method==='POST'){
    let problem=new Problem(req.body);
    await problem.save();
    res.status(201).json(problem);
  }  
}