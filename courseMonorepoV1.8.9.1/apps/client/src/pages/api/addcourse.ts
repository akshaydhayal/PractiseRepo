import mongoose from 'mongoose';
import {Course} from "db";
import { NextApiRequest,NextApiResponse } from "next";

export default async function Handler(req:NextApiRequest,res:NextApiResponse){
    const {title,description,price,imageLink}=req.body;
    const course=new Course({title,description,price,imageLink});
    await course.save();
    res.status(201).json({msg:"Course created!!",course});
}