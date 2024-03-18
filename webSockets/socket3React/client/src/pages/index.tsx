import Image from "next/image";
import { Inter } from "next/font/google";
import {io} from "socket.io-client"
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const socket=io("http://localhost:3006");
  return (
    <div>
      Hello
    </div>
  );
}
