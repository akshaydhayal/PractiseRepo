import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {Navbar} from "ui";
import {RecoilRoot, useRecoilState,useSetRecoilState} from "recoil";
import {userState} from "store";
import { useEffect } from "react";
import axios from "axios";

export default function App({ Component, pageProps }: AppProps) {
  return(
  <div>
    <RecoilRoot>
      <InitUser/>
      <Navbar/>
      <Component {...pageProps} />;
    </RecoilRoot>    
  </div>
  )
}

function InitUser(){
  const [user,setUser]=useRecoilState(userState);
  useEffect(()=>{
    async function getUsername(){
      const response=await axios.get("/api/me",{
        headers:{
          token:localStorage.getItem("courseToken")
        }
      });
      console.log(response.data);
      if(response.data.username){
        setUser({userLoading:false,username:response.data.username});
      }
    }
    getUsername();
  },[]);

  return(
    <div>
    </div>
  )
}