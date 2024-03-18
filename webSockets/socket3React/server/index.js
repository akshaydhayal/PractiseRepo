import express from "express";
import http from "http";
import {Server} from "socket.io";


const app=express();
const httpServer=http.createServer(app);

const io=new Server(httpServer);
io.on("connection",(socket)=>{
    console.log(`user connected, ${socket.id}`);
})

httpServer.listen(3005,()=>{
    console.log("server runnig at 3005");
})