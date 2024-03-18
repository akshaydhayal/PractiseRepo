import http from "http";
import express from "express";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
// app.use(cors());-

const httpServer = http.createServer(app);
const server = new Server(httpServer);

app.get("/", (req, res) => {
  res.sendFile(process.cwd()+"/index.html");

});

server.on("connection", (socket) => {
  console.log("user connected!!"+socket.id);

  socket.on("chat-msg",(msg)=>{
    console.log(msg);
    server.emit("chat-msg",msg);
  })

  socket.on("p2p-chat-msg", (data) => {
    console.log(data);
    server.to(data.socketIdContent).emit("p2p-chat-msg",data.msgContent);
  });

  socket.on("join",(room)=>{
    socket.join(room);
    console.log(`${socket.id} joined room ${room}`)
  })
  socket.on("group-chat-msg",(data)=>{
    // socket.join(data.groupId);
    server.to(data.groupId).emit("group-chat-msg",data.msgContent);
  
})

})

httpServer.listen(3006, () => {
  console.log("server running at 3006");
});
