import express from "express";
import {Server} from "socket.io";
import http from "http";
const app=express();

const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:"http://localhost:5174",
        methods:["GET","POST"],
        credentials:true
    }
});

io.on("connection",(socket)=>{
    console.log("user connected!! id : "+socket.id);
    socket.on("chat-msg",(msg)=>{
        console.log(msg);
        // socket.emit("rec-msg",msg);
        io.emit("rec-msg",msg);
    })

    socket.on("disconnect",()=>{
        console.log("user disconnetced!!");
    })
})
server.listen(3002,()=>{
    console.log("server is running at 3002");
})