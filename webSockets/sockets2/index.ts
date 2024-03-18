import http from "http";
import { Server } from "socket.io";

const httpServer=http.createServer();
const server=new Server(httpServer);

// server.

httpServer.listen(3005,()=>{
    console.log("server running at 3006");
})