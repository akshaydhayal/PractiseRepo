import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Navbar/>
      course selling in next
    </div>
  );
}
