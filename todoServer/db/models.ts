import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:String,
    password:String,
});
const todoSchema=new mongoose.Schema({
    title:String,
    description:String,
    completed:Boolean,
    userId:{"type":mongoose.Schema.Types.ObjectId,"ref":"User"}
});

export const User=mongoose.model("User",userSchema);
export const Todo=mongoose.model("Todo",todoSchema);
