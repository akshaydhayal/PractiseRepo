import Image from "next/image";
import { Inter } from "next/font/google";
import Videocard from "@/components/Videocard";
import Videogrid from "@/components/Videogrid";
import Navbar from "@/components/Navbar";
import VerticalNav from "@/components/VerticalNav";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="flex pt-10 ml-16">
        <div className="fixed left-0">
          <VerticalNav />
        </div>
        <Videogrid /> 
      </div>
    </div>
  );
}
