import { useEffect, useState } from "react";
import { BASE_URL } from "@/config";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import {userState} from "@/store/atoms/user";

export default function signupPage(){
    const router=useRouter();
    const setUser=useSetRecoilState(userState);
    const [username,setUsername]=useState<string>("");
    const [password,setPassword]=useState("");

    async function init(){
        try {
            const response=await fetch(`${BASE_URL}/admin/signup`,{
                method:'POST',
                body:JSON.stringify({
                    username,password
                }),
                headers:{'content-Type':"application/json"}
            });
            const data=await response.json();
            if (data.token) {
              localStorage.setItem("courseToken", data.token);
              setUser({userLoading:false,username:username});
              router.push('/courses');
            }
            console.log(data);
            
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
      <div className="flex justify-center mt-32">
        <div className="flex flex-col w-80 gap-2">
          <p>Welcome to Coursera, Signup below</p>
          <input type="text" placeholder="enter username" onChange={(e)=>setUsername(e.target.value)}/>
          <input type="text" placeholder="enter password" onChange={(e)=>setPassword(e.target.value)}/>
          <button onClick={init}>Signup</button>
        </div>
      </div>
    );
}