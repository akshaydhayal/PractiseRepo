import express from "express";
import {dirname} from "path";
import { fileURLToPath } from "url";
import http from "http";
import {Server} from "socket.io";

const app=express();
const httpServer=http.createServer(app);

const io=new Server(httpServer);

io.on('connection',(socket)=>{
    socket.on('chat msg',(msg)=>{
        io.emit('chat msg',msg);
        console.log("message : "+msg);
    })
    console.log("a user connected!!");
});

app.get("/",(req,res)=>{
    const __dirname = dirname(fileURLToPath(import.meta.url));
    res.sendFile(__dirname+"/index.html");
})

httpServer.listen(3004,()=>{
    console.log("http running on 3004");
})