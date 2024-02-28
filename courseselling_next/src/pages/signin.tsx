import { useEffect, useState } from "react";
import { BASE_URL } from "@/config";
import { useRouter } from "next/router";
import { userState } from "@/store/atoms/user";
import { useSetRecoilState } from "recoil";

export default function signinPage() {
  const router=useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const setUser=useSetRecoilState(userState);

  async function init() {
    try {
      const response = await fetch(`${BASE_URL}/admin/login`,{
        method:"POST",
        body:JSON.stringify({username,password}),
        headers:{'content-Type':"application/json"}
      });
      const data = await response.json();
      if(data.token){
        localStorage.setItem('courseToken',data.token);
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
        <p>Welcome to Coursera, Signin below</p>
        <input
          type="text"
          placeholder="enter username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={init}>Signin</button>
      </div>
    </div>
  );
}
