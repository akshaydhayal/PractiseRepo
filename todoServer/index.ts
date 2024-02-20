import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import {router as todoRouter} from "./routes/todos.js";
import {router as userRouter} from "./routes/users.js";

const app=express();
app.use(cors());
app.use("/todos",todoRouter);
app.use("/users",userRouter);

mongoose.connect("mongodb+srv://akshay:akshay@cluster0.jy7weei.mongodb.net/todoApp")
.then(()=>{
    console.log("mongoose connected");
});
app.listen(3001,()=>{
    console.log("server running at 3001");
})