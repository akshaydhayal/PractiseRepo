import {io} from "socket.io-client";

export default function chatsPage(){
    const server=io("http://localhost:3005");
    return(<div>
        Hello
    </div>)
}