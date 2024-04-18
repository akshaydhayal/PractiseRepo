// 'use server'
// import mongoose from "mongoose";
import { connect } from "mongoose";

let alreadyConnected=false;

export async function dbConnect(){
    console.log(`already connected : ${alreadyConnected==false}`)
    if(alreadyConnected){
        return;
    }
    alreadyConnected=true;
    console.log("hello from dbConnect");
    // await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL, {dbName: "Leetcode",})
    await connect(process.env.NEXT_PUBLIC_MONGO_URL, {dbName: "Leetcode"})
    .then(() => {
      console.log("mongoose connected!!");
    });
}