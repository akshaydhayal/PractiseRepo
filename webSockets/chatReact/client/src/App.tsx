import { useState,useEffect, useMemo } from "react";
import {io} from "socket.io-client";

function App() {
  const [msg,setMsg]=useState("");
  const [chats,setChats]=useState([]);
  // const socket=io("http://localhost:3002");
  const socket = useMemo(() =>io("http://localhost:3002"),[]);

  // const [socket,setSocket]=useState(null);
  useEffect(()=>{
    // socket=io("http://localhost:3002");
    // const newSocket=io("http://localhost:3002");
    // setSocket(newSocket);
    // if(socket){
      socket.on("connect",()=>{
        console.log("user connected id : "+socket.id);
      })
      
      socket.on("rec-msg",(msg)=>{
        console.log(`prev chat : ${chats} , new chat : ${msg}`)
        setChats([...chats,msg]);
      })
      },[chats])

    // socket.on("rec-msg",(msg)=>{
    //   console.log(`prev chat : ${chats} , new chat : ${msg}`)
    //   setChats([...chats,msg]);
    // })
  
  function handleSendMessage(){
    socket?.emit("chat-msg",msg);
    setMsg("");
  }

  console.log('chats : '+chats);
  return(
  <div>
    <h3>Chat app</h3>
    <p>Messages</p>
    <div>
      {chats && chats.map((c)=>{
        return <p>{c}</p>
      })}
    </div>
    <input type='text' placeholder='Enter msg' value={msg} onChange={(e)=>{setMsg(e.target.value)}}/>
    <button onClick={handleSendMessage}>Send message</button>
  </div>
  )
}

export default App;
