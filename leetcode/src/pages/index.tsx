import { dbConnect } from "@/utils/dbConnect";
import { Inter } from "next/font/google";
// import { initializeApp } from "firebase/app";
import mongoose from "mongoose";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  // dbConnect();
  // mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL,{
  //       dbName: "Leetcode",
  //     })
  //   .then(() => {
  //   console.log("mongoose connected!!");
  // });
  
  useEffect(() => {
    // Check if the current path is "/"
    if (router.pathname === "/") {
      // Redirect to "/hello-nextjs"
      router.push("/problems");
    }
  }, [router]);

  return (
    <div>
      {/* {router.push('/problems')} */}
      {/* <Navbar/> */}
      Hello
    </div>
  );
}
